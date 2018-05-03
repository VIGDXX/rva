import Observer from './observer/index.js'
import Compliler from './compiler/index.js'

export default class Rva {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el
    this.init();
  }
  init() {
    new Observer(this.$data);
    new Compliler(this.$el,this.$data);
  }
}
window.Rva = Rva