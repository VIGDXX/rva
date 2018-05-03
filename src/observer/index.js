import Watcher from '../watcher/index.js';
export default class Observer {
    constructor(data) {
        this.data = data
        this.addListener()
    }

    addListener() {
        Object.keys(this.data).forEach(key => {
            let oldVal = data[key];
            Object.defineProperty(data, key, {
                enumerable: true, // 可枚举
                configurable: false, // 不能再define                
                get: function () {
                    console.log(key)
                    return oldVal
                },
                set: function (newVal) {
                    if (newVal !== oldVal) {
                        let watcher = new Watcher(x => {
                            console.log(x)
                        });
                        watcher.update();
                    }
                    return newVal
                }
            })
        })
    }

}