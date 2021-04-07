import adaptive from './adaptive'
import Vue from 'vue'

const install = function(Vue) {
  Vue.directive('adaptive', adaptive)
}

if (window.Vue) {
  window['adaptive'] = adaptive
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

adaptive.install = install
export default adaptive
