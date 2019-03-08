import { bind } from './utils.js'
class ModalHandler {
	constructor(modules) {
		//  ensure constructor's safety
		if(this instanceof ModalHandler) {
			this._modules = modules;
			this._crtDisplayEl = null;
		} else {
			return new ModalHandler(modules);
		}

	}
	showToast(options = {}) {
		let { duration = 1000, transition = 300, message = '', success = function() {} } = options;
		let transitionDuration = transition/1000 + 's';

		let instance = new this._modules.Toast().$mount(document.createElement('div'));  // 创建一个新的实例

		instance.message = message || 'hello world';
		instance.animation.transitionDuration = transitionDuration;
		document.body.appendChild(instance.$el);
		console.log('time', transition, duration);
		setTimeout(() => {
			instance.visible = true;
		}, 0);

		setTimeout(() => {
			instance.visible = false;
			setTimeout(() => {
				document.body.removeChild(instance.$el); //  $el refers to root element mounted by vue object
				success && success();
			}, transition)
		}, transition + duration);
	}
	showDialog(options = {}) {
		let { confirm, cancel } = options;
		let instance = new this._modules.Dialog().$mount(document.createElement('div'));  // 创建一个新的实例
		document.body.appendChild(instance.$el);
		instance._self = instance.$el;
		instance.confirm = confirm;
		instance.cancel = cancel;
		setTimeout(() => {
			instance.visible = true;
		}, 0);
	}
	show(name) {
		let div = document.createElement('div');
		//  set modal container's style
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.bottom = '0';
		div.style.left = '0';
		div.style.right = '0';
		div.style.zIndex = '2000';
		div.style.display = 'flex';
		div.style.justifyContent = 'center';
		div.style.alignItems = 'center';
		div.style.background = 'rgba(0, 0, 0, 0.6)';
		div.style.opacity = '0';
		div.style.transition = 'all .3s ease-out';
		//  init modal--container
		let instance = new this._modules[name]().$mount();
		div.appendChild(instance.$el);
		document.body.appendChild(div);
		this._crtDisplayEl = div;
		//  ensure closeDisplayEl always work in modalHandler context
		instance.$close = bind(this.closeDisplayEl, this);

		setTimeout(() => {
			div.style.opacity = '1';
		}, 0)
	}
	closeDisplayEl() {
		if(!this._crtDisplayEl) {
			return
		}
		document.body.removeChild(this._crtDisplayEl);
		this._crtDisplayEl = null;
	}
	setCrtDisplayEl(el) {
		this._crtDisplayEl = el;
	}
}
export default ModalHandler
