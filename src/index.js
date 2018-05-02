import Observer from './observer/index.js'
import Compliler from './compliler/index.js'

class Wind {
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
