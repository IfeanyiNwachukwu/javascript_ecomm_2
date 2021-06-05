const fs = require('fs');
const crypto = require('crypto');
module.exports = class Repository {
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
        const items = await this.GetAll();
        items.push(attrs);
        await this.WriteAll(items);
        return attrs;

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