import { checkIfDataAnObject, checkIfDataAnArray } from './utils'
import Dialog from './templates/dialog.vue'
import Toast from './templates/toast.vue'

let defaultTemplate = ['Toast', 'Dialog'];

let initDefaultTemplate = function(Vue) {
	let defaultTemplates = { Dialog, Toast };
	let ComponentClasses = {};
	Object.keys(defaultTemplates).forEach(key => {
		ComponentClasses[key] = Vue.extend(defaultTemplates[key]);
	});
	return ComponentClasses;
};

let mixinVueModules = function(obj, modules, Vue) {
	let newComponentClasses = Object.assign({}, obj);
	modules.forEach(module => {
		if(checkIsDefaultTemplate(module.name)) {
			newComponentClasses['_' + module.name] = Vue.extend(module);
		} else {
			newComponentClasses[module.name] = Vue.extend(module);
		}
	});
	return newComponentClasses;
};

let mixinProps = function(vm, props) {
	if(!checkIfDataAnObject(props)) {
		return
	}
	let propsKey = Object.keys(props).filter(prop => prop in vm.$options.props);
	propsKey.forEach(key => {
		vm[key] = props[key];
	})
};

let mixinInvokers = function(vm, invokers) {
	if(!checkIfDataAnObject(invokers)) {
		return
	}
	let invokerKeys = Object.keys(invokers);
	invokerKeys.forEach(key => {
		if(!vm._events[key] || !checkIfDataAnArray(vm._events[key])) {
			vm._events[key] = [];
		}
		vm._events[key].push(invokers[key])
	});
};

let checkIsDefaultTemplate = function(name) {
	return defaultTemplate.indexOf(name) > -1;
};

export {
	initDefaultTemplate,
	mixinProps,
	mixinInvokers,
	checkIsDefaultTemplate,
	mixinVueModules
}