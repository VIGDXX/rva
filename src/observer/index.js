import Watcher from '../watcher/index.js';
export default class Observer {
    constructor(data) {
        this.data = data
        this.addListener()
    }

    addListener() {
        let data = this.data;
        let dep = new Dep();
        Object.keys(data).forEach(key => {
            let oldVal = data[key];
            Object.defineProperty(data, key, {
                enumerable: true, // 可枚举
                configurable: false, // 不能再define                
                get: function () {
                    Dep.target && dep.addSub(Dep.target);
                    return oldVal
                },
                set: function (newVal) {
                    if (newVal !== oldVal) {
                        oldVal = newVal;
                        dep.notify();
                    } else {
                        return                      
                    }

                }
            })
        })
    }

}

export class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach( sub => {
            sub.update();
        } )
    }
}

Dep.target = null;