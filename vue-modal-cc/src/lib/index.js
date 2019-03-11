import ModalHandler from './Modal'
import { initDefaultTemplate, mixinVueModules } from './init'

//  a tool to show modal with custom component, designed by single instance
let Modal = {
	_default: ['Toast', 'Dialog'],
	$Vue: null,
	_instance: null,
	installed: false,
	install(Vue, options = {}) {
		if(this.installed) {
			return
		}
		if(!this.$Vue) {
			this.$Vue = Vue;
		}
		let self = this,
			_ComponentClasses = {};

		//  init default
		_ComponentClasses = initDefaultTemplate(Vue);
		//	mixin user modules
		if(options.modules && options.modules.length) {
			_ComponentClasses = mixinVueModules(_ComponentClasses, options.modules, Vue);
		}

		//  将获取实例的方法封装到Vue原型中，用户无法直接操作Modal Object
		Vue.prototype.getModalHandler = function() {
			if(!self._instance) {
				self._instance = new ModalHandler(_ComponentClasses);
			}
			return self._instance
		};
		this.installed = true;
	}
};

export default Modal