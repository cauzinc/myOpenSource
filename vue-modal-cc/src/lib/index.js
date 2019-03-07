let templates = require.context('./templates', false);

//  以单例模式设计的，用于vue组件中加载模态框的工具
let Modal = {
	ModalHandler: null,
	//  存放所有Vue实例模板
	_ComponentClasses: {},
	_templates: {},
	install(Vue, options) {
		if(this.installed) {
			return
		}
		let self = this;
		//  将获取实例的方法封装到Vue原型中，用户无法直接操作Modal Object
		Vue.prototype.getModalHandler = function() {
			if(!self.ModalHandler) {
				self.initModalHandler();
			}
			return self.ModalHandler
		};
		Object.keys(this._templates).forEach(key => {
			this._ComponentClasses[key] = Vue.extend(this._templates[key]);
		})
	},
	initModalHandler() {
		let self = this;
		this.ModalHandler = {
			showToast(options = {}) {
				let { duration = 1000, transition = 200, message = '', success = function() {} } = options;
				let animationDuration = transition/1000 + 's';

				let instance = new self._ComponentClasses.Toast().$mount(document.createElement('div'));  // 创建一个新的实例

				instance.message = message || 'hello world';
				instance.animation.animationDuration = animationDuration;
				instance.visible = true;
				document.body.appendChild(instance.$el);

				setTimeout(() => {
					instance.visible = false;
					setTimeout(() => {
						document.body.removeChild(instance.$el); // vue对象的 $el 表示vue的挂载元素
						success && success();
					}, transition);
				}, transition + duration);
			},
			showDialog(options = {}) {
				let { confirm, cancel } = options;
				let instance = new self._ComponentClasses.Dialog().$mount(document.createElement('div'));  // 创建一个新的实例
				document.body.appendChild(instance.$el);
				instance._self = instance.$el;
				instance.confirm = confirm;
				instance.cancel = cancel;
				setTimeout(() => {
					instance.visible = true;
				}, 0);
			}
		}
	}
};

// 初始化默认模板
function initDefaultTemplates() {
	templates.keys().map(file => {
		Modal._templates[templates(file).default.name] = templates(file).default;
	});
}

initDefaultTemplates();


if(window.Vue) {
	Vue.use(Modal);
}

export default Modal