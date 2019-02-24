import config from '../config/config';
import DirWatcher from './dirwatcher';
import Importer from './importer';


let watcher = new DirWatcher();
let importer = new Importer();

watcher.watch(config.importDir, config.scanPeriod);
watcher.onChanged(file => {

    importer.import(file)
        .then(objArray => console.log(objArray))
        .catch(err => {
            console.error(err);
            throw err
        });
});