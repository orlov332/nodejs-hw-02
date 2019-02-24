import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';

export default class DirWatcher extends EventEmitter {

    constructor() {
        super();
        this.onChangedName = 'dirwatcher:changed';
    }

    emitOnChanged(file) {
        this.emit(this.onChangedName, file);

    }

    onChanged(listener, ...arg) {
        this.on(this.onChangedName, listener, arg);
    }

    watch(pathToWatch, delay) {

        let self = this;
        let importedFiles = {};

        setInterval(() => {

            fs.readdir(pathToWatch, {withFileTypes: true}, (err, files) => {

                if (err) {
                    console.log(`Error reading import dir: ${err}`);
                    throw err;
                } else {
                    for (let file of files) {
                        if (file.isFile() && file.name.endsWith('.csv')) {
                            if (importedFiles[file.name]) {
                                console.log(`Already imported file detected: ${file.name}. Skipped...`);
                            } else {
                                console.log(`New import file detected: ${file.name}`);
                                importedFiles[file.name] = true;
                                self.emitOnChanged(path.join(pathToWatch, file.name));
                            }
                        }
                    }
                }
            });
        }, delay);

    }
}