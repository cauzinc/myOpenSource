import ModalHandler from './Modal'
import { initDefaultTemplate } from './init'

//  a tool to show modal with custom component, designed by single instance
let Modal = {
	_default: ['Toast', 'Dialog'],
	$Vue: null,
	_instance: null,
	install(Vue, options = {}) {
		if(this.installed) {
			return
		}
		if(!this.$Vue) {
			this.$Vue = Vue;
		}
		let self = this,
			_defaultTemplates = {},
			_ComponentClasses = {};
		_defaultTemplates = initDefaultTemplate();

		//  init default
		Object.keys(_defaultTemplates).forEach(key => {
			_ComponentClasses[key] = Vue.extend(_defaultTemplates[key]);
		});
		if(options.modules && options.modules.length) {
			options.modules.forEach(module => {
				if(this._default.indexOf(module.name) > -1) {
					_ComponentClasses['_' + module.name] = Vue.extend(module);
				} else {
					_ComponentClasses[module.name] = Vue.extend(module);
				}
			})
		}

		//  将获取实例的方法封装到Vue原型中，用户无法直接操作Modal Object
		Vue.prototype.getModalHandler = function() {
			if(!self._instance) {
				self._instance = new ModalHandler(_ComponentClasses);
			}
			return self._instance
		};

	}
};


export default Modal