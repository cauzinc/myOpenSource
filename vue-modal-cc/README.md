# vue-modal-caller

##### The project trys to create an easier way to call custom modal with vue.js. The project is designed with singular instance model, so developers need not to worry repeated object created and problems with performance.

##### 这个库致力于在vue框架中，创造一种简单的调用自制模态框的方法。这个基于单例模式设计，不会创建重复的实例，开发者不必担心性能问题。


### Install

```bash
npm install vue-modal-caller --save
```

### How to use

Include plugin in your `main.js` file. And init all your custom modals.

`main.js` 

```javascript
import Modal from 'vue-modal-caller'
import loginModal from './components/modals/loginModal'
import warnModal from './components/modals/warnModal'
import infoModal from './components/modals/infoModal'
...
Vue.use(Modal, {
  modules: [ loginModal, warnModal, infoModal ]
}})

```
Then in your vue page, you can call your modal with an instance we provide. Get it by `$getModalHandler` function which we have attached to Vue.prototype.
In the created hook, the login modal will be called out, and you don't need to add codes in your template part.

`home.vue`
```javascript
export default {
  data() {
    return {
      modalHandler: this.$getModalHandler()
    }
  },
  created() {
    this.modalHandler.show('loginHandler');
  }
/*
By default, show method will use "modal" name to locate component.
Please ensure an unique name property for every of your modal.
*/
}
```
### Rcommend usage

We assume that you put all your custom modals into one directory, and here comes my suggested configuaration when init.

```javascript
import Modal from 'vue-modal-caller'
let modals = require.context('./components/modals', true, /\.(vue)$/);
let modules = modals.keys().map(key => modals(key).default);

Vue.use(Modal, {
  modules
}})

Vue.prototype.$modal = Vue.prototype.$getModalHandler();
/*
require.context() is an api from webpack, which can import context dynamically. In this way when you add new modal, you are not supposed to import the module again.
*/

```
Everywhere you want to call your modal, you don't have to wirte additional code anymore:

`somePage.vue`

```javascript
created() {
  this.$modal.show('loginModdal');
}
/*
Just by one line, modal is called in you page
*/
```

---
### Communication between modal and parent
`somePage.vue`
```javascript
created() {
  this.$modal.show('loginModdal', {
    props: {
      userName: "admin",
      password: "123"
    },
    invokers: {
      loginSuccess:() => {
        this.$modal.closeDisplayEl().then(modal => {
          alert('success login')
        })
      }
    }
  });
}
/*
You can pass your props and invokers into your modal. Props refer to the props your modal supposed to receive. And invokers can be called by Vue's api $emit();
*/

```
Let's check the code in loginModal.vue

`loginModal.vue`
```javascript
props: ['userName', 'password'],
methods: {
  login() {
    if(this.userName === 'admin' && this.password == '123') {
      this.$close().then(modal => {
        this.$emit('loginSuccess');
      })
    }
  }
}

/*
Method $close() in your modal and Vue.prototype.$modal.closeDisplayEl() could close current modal. The method mixins by default.

Both method will return a Promise, which delivers a $modal instance so you can do you work after a modal is closed.

You can also close your modal by using $emit('close'), but it won't send Promise Object.
*/
```

<img src="https://github.com/cauzinc/myOpenSource/blob/master/assets/login.gif">

---



### Call a toast and dialog

The default modal injected are toast and dialog. You can call them: 

* Vue.prototype.\$modal.showDialog({  
&emsp;&emsp;  confirm: Function,  // the method invoked by 'confirm'  
&emsp;&emsp;  cancel: Function  // the method invoked by 'cancel'  
});   
* Vue.prototype.\$modal.showToast({  
  &emsp;&emsp;message: String  
});   

The recommend is to create your general toast and dialog. Your modal could also named with 'toast' or 'dialog', and it won't conflict width default modal.

<img src="https://github.com/cauzinc/myOpenSource/blob/master/assets/loginOut.gif">




#### I will implement vue-modal-caller as soon.  Please enjoy it.
#### Welcome your issue.

