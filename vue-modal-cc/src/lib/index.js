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

		//  prevent user from manipulating Modal Class, they could only use the singular object with method attached into Vue.prototype
		Vue.prototype.$getModalHandler = function() {
			if(!self._instance) {
				self._instance = new ModalHandler(_ComponentClasses);
			}
			return self._instance
		};
		this.installed = true;
	}
};

export default Modal