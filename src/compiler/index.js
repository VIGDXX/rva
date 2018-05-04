import Watcher from '../watcher/index.js';

export default class Compiler {
    constructor(el,data) {
        this.el = this.node2Fragment(document.querySelector(el));
        this.data = data;
        this.init();
        document.querySelector(el).appendChild(this.el);
    }

    init() {
        let childNodes = this.el.childNodes;
        [].slice.call(childNodes).forEach( (node) => {
            let text = node.textContent;
            const reg = /\{\{(.*)\}\}/;
            if(node.nodeType == 3 && reg.test(text)) {
                this.compileText(node,RegExp.$1)
            }
        } )
    }

    compileText(node,value) {
        node.textContent = this.data[value];
        let watcher = new Watcher(this.data, value, () => {
            node.textContent = this.data[value];
        })
    }

    node2Fragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
}