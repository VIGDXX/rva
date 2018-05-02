import Watcher from '../watcher/index.js';

export default class Compiler {
    constructor() {
        new Watcher( x => {
            console.log(x)
        })
    }
}