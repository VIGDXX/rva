import { Dep } from '../observer/index.js'
export default class Watcher {
  constructor(data,key,cb) {
    Dep.target = this;
    data[key];
    Dep.target = null;
    this.data = data;
    this.key = key;
    this.cb = cb;
  }
  update() {
    this.cb()
  }
}