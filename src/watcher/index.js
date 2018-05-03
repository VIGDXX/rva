export default class Watcher {
  constructor(cb) {
    this.cb = cb;
  }
  update(newVal) {
    this.cb(newVal)
  }
}