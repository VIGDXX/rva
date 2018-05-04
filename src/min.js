/**
 * @author vigdxx@gmail.com
 */

class Util {
    constructor() {
        this.toStr = Object.prototype.toString
    }

    isObject(obj) {
        return this.toStr.call(obj) === '[object Object]'
    }
    isArray(arr) {
        return this.toStr.call(arr) === '[object Array]'
    }
}
var util = new Util();

class Rva {
    constructor(options) {
        this.$id = options.id; 
        this.$data = options.data;
        this.methods = options.methods;
        new Observer(this);
        new Compiler(this)
    }

}

/**
 * @description 观察者，监听数据变化，通知对应订阅者
 */
class Observer {
    constructor(vm) {
        this.initDataReactive(vm.$data)
    }
    initDataReactive(data) {
        if(!util.isObject(data) && !util.isArray(data)) { return }
        let dep = new Dep();
        Object.keys(data).forEach( key => {
            let value = data[key]; 
            this.initDataReactive(value)
            Object.defineProperty(data,key, {
                configurable:false,
                enumerable:true,
                get(){
                    Dep.subscriber && dep.addSub(Dep.subscriber); //视图中需要更新的属性变化时才会 addSub ，set 时才会 notify
                    return value
                },
                set(newValue) {
                    if(newValue !== value) {
                        value = newValue;
                        dep.notify(); // 通知订阅者
                    }                    
                }
            })
            
        } )

    }
}

/**
 * @description 依赖收集类
 */
class Dep {
    constructor() {
        this.subs = [];
    }
    /**
     * @description 添加订阅者
     * @param {Watcher} sub 
     */
    addSub(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach( sub => {
            sub.update();
        } )
    }
}

/**
 * @description 订阅者
 */
class Watcher {
    constructor(data,key,cb){
        this.$data = data;
        this.$key = key;
        this.$cb = cb;
        this.triggerDepAddSub();
    }
    triggerDepAddSub() {
        Dep.subscriber = this;
        this.$data[this.$key];
        Dep.subscriber = null;
    }
    update() {
        this.$cb();
    }
}


/**
 * @description 模板引擎
 */
class Compiler {
    constructor(vm) {
        let idSelector = vm.$id;
        this.$el = document.querySelector(idSelector);
        this.$data = vm.$data;
        this.compile();
    }
    compile() {
        let fragment = document.createDocumentFragment();
        let child;
        const reg = /\{\{(.*)\}\}/;
        while(child = this.$el.firstChild) {
            fragment.appendChild(child)
        }
        [].slice.call(fragment.childNodes).forEach( node => {
            if(node.nodeType == 3 && reg.test(node.textContent)) {
                let key = RegExp.$1;
                node.textContent = this.$data[key]; // 触发一次 get，但是 Dep.subscriber 为 undefined ，故不会向依赖收集者添加订阅者
                new Watcher(this.$data,key,function(){
                    node.textContent = this.$data[key];
                })
            }
        } )
        this.$el.appendChild(fragment)
    }

}

window.Rva = Rva