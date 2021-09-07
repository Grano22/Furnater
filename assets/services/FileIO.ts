import fs, { fstat } from 'fs';

export default class FileIO {
    static loadFromFile(filePath) {
        try {
            if(!fs.existsSync(filePath)) throw `File ${filePath} not exists`;
            const data = fs.readFileSync(filePath, { encoding:'utf8', flag:'r' });
            return data;
        } catch(err) {
            console.error(err);
        }
    }

    static saveToFile(filePath : string, toWrite : string, options : Record<string, any> = {}) {
        try {
            fs.writeFileSync(filePath, toWrite);
        } catch(err) {
            console.error(err);
        }
    }
}