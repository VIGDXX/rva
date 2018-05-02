export default class Watcher {
    constructor(cb) {
        this.a = 1
        this.cb = cb;
        this.cb(this.a++);
    }
    update() {
        console.log(this)
        this.cb(this.a++)
    }
}