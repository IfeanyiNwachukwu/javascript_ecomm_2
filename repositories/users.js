const crypto = require('crypto');
const fs = require('fs');
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
        attrs.Id = this.RandomId();
        // Get the latest record
        const records = await this.GetAll();
        // push our new record into the existing record
        records.push(attrs);
        // Write the updated record to disc
        await this.WriteAll(records);
    }

    GetOne = async(Id) => {
        const records = await this.GetAll();
        return records.find(record => record.Id === Id);
    }







    async WriteAll(records) {e
        await fs.promises.writeFile(this.Filename, JSON.stringify(records, null, 2));
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');
    const data = await repo.GetOne("1a7a5d4b");
    console.log(data);
}
test();