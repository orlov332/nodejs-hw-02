import csv from 'csvjson';
import fs from 'fs';

export default class Importer {

    constructor() {

    }

    async import(path) {
        return await this.importSync(path);
    }

    importSync(path) {
        let file_data = fs.readFileSync(path, { encoding : 'utf8'});

        return csv.toObject(file_data);
    }
}