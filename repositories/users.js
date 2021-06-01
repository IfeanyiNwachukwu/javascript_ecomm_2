const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const Scrypt = util.promisify(crypto.scrypt);

class UsersRepository{
    constructor(filename){
        if(!filename){
            throw new Error('Creating a user repository requires a filename')
        }
        this.Filename = filename;
        try {
            fs.accessSync(this.Filename);
        } catch (error) {
            fs.writeFileSync(this.Filename,'[]');
        }
    }

    GetAll = async () => {
        return await JSON.parse(await fs.promises.readFile(this.Filename));   //Note: utf8 is the default encoding
    }

    RandomId = () => {
        return crypto.randomBytes(4).toString('hex');
    }

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
    GetOne = async(Id) => {
        const records = await this.GetAll();
        return records.find(record => record.Id === Id);
    }

    Delete = async(Id) => {
        const records = await this.GetAll();
        const filteredRecords = records.filter(record => record.Id !== Id);
        await this.WriteAll(filteredRecords);
    }

    Update = async(Id,attrs) => {
        const records = await this.GetAll();
        const record = records.find(record => record.Id === Id);
        Object.assign(record,attrs);
        await this.WriteAll(records);
    }

    GetOneBy = async (filters) => {
        const records = await this.GetAll();

        for(let record of records){
            let found = true;
            for(let key in filters){
                if(record[key] !== filters[key]){
                    found = false;
                }
            }
            if(found){
                return record;
            }
        }
    }


  async WriteAll(records) {
        await fs.promises.writeFile(this.Filename, JSON.stringify(records, null, 2));
    }
}

module.exports = new UsersRepository('users.json')