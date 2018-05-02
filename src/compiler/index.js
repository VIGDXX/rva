export default class Compiler {
    constructor() {
        new Watcher( x => {
            console.log(x)
        })
    }
}