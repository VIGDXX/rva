import Watcher from '../watcher/index.js';

export default class Compiler {
    constructor(el,data) {
        this.el = this.node2Fragment(document.querySelector(el));
        this.data = data;
        this.init();
        new Watcher(x => {
            console.log(x)
        })
    }

    init() {
        let childNodes = this.el.childNodes;
        [].slice.call(childNodes).forEach( (node) => {
            let text = node.textContent;
            const reg = /\{\{(.*)\}\}/;
            if(node.nodeType == 3 && reg.test(text)) {
                compileText(text,RegExp.$1)
            }
        } )
    }

    compileText() {

    }

    node2Fragment() {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
}