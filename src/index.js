import Observer from './observer/index.js'
import Compliler from './compiler/index.js'

export default class Rva {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.init();        
    }
    init() {
        new Observer(this.$data);
        new Compliler();
    }   
}
window.Rva = Rva