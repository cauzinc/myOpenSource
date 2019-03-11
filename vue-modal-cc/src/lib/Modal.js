import { bind, throttle } from './utils'
import { mixinProps, mixinInvokers, checkIsDefaultTemplate } from './init'

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

		let instance = new this._modules.Toast().$mount(document.createElement('div'));

		instance.message = message || 'hello world';
		instance.animation.transitionDuration = transitionDuration;
		document.body.appendChild(instance.$el);
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
		let instance = new this._modules.Dialog().$mount(document.createElement('div'));
		document.body.appendChild(instance.$el);
		instance._self = instance.$el;
		instance.confirm = confirm;
		instance.cancel = cancel;
		setTimeout(() => {
			instance.visible = true;
		}, 10);
	}
	show(name, opt = {}) {

		let { props, invokers, options } = opt;
		//  check if instance exist or conflict with default template
		if(checkIsDefaultTemplate(name)) {
			name = '_' + name
		}
		if(!this._modules[name]) {
			return
		}
		let instance = new this._modules[name]().$mount();
		let div = document.createElement('div');

		//  set modal container's style
		div.style.position = 'fixed';
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

		div.appendChild(instance.$el);
		document.body.appendChild(div);
		this._crtDisplayEl = div;

		//  ensure closeDisplayEl always work in modalHandler context
		//  check if developer has defined the function
		let closeFn = bind(this.closeDisplayEl, this);
		if(!instance.$close) {
			instance.$close = closeFn;
		} else if (typeof instance.$close === 'function') {
			//  if $close is registered as a function, we could mixin our function body into it
			let originClose = instance.$close;
			instance.$close = function() {
				originClose(...arguments);
				return closeFn();
			}
		}

		//  initProps: only when the key is registered as prop, we set the value
		mixinProps(instance, props);

		//  init invokers
		mixinInvokers(instance, invokers);

		//  bind func into _events so that vm could invoke the func by $emit(),
		//  ensure user could close the modal in case developer defined $close(), vm.$emit() will invoke functions in order
		if(!instance._events['close']) {
			instance._events['close'] = [];
		}
		instance._events['close'].push(bind(this.closeDisplayEl, this));


		setTimeout(() => {
			div.style.opacity = '1';
		}, 0)
	}
	closeDisplayEl() {
		//  sometimes user will click continuously, so suggestion is apply a throttle to your fn which calls this.$close()
		if(!this._crtDisplayEl) {
			return
		}
		let ele = this._crtDisplayEl;
		this._crtDisplayEl = null;
		return new Promise((resolve, reject) => {
			ele.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(ele);
				resolve(this);
			}, 300);
		})
	}
}
export default ModalHandler
