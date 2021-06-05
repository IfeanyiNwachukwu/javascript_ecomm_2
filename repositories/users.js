const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const Scrypt = util.promisify(crypto.scrypt);
const Repository = require('./repository');

class UsersRepository extends Repository{
    Create = async(attrs) => {
        // create salt
        const salt = crypto.randomBytes(8).toString('hex');
        // create Hash
        const buff = await Scrypt(attrs.password,salt,64);
        attrs.Id = this.RandomId();

        // Create a new record
        const record = {...attrs,password:`${buff.toString('hex')}.${salt}`};
        // Get the latest records from DB
        const records = await this.GetAll();
        // push our new record into the existing records in the DB
        records.push(record);
        // Write the updated record to disc
        await this.WriteAll(records);
        return record;
    }
    ComparePasswords =  async(saved,supplied) => {
        // saved -> password in our DB
        // supplied -> password of user about to sign in
        const [hashed,salt] = saved.split('.');
        const suppliedPasswordBuf = await Scrypt(supplied,salt,64);
        console.log(`savedHash : ${hashed}`);
        console.log(`suppliedHash : ${suppliedPasswordBuf}`);
        return hashed === suppliedPasswordBuf.toString('hex');
    }
}

module.exports = new UsersRepository('users.json')