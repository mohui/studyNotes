# vue学习文档
vue学习笔记
## 安装vue
npm安装
## 安装Element组件
* npm安装组件
```
npm i element-ui -S
```
* 安装完引用组件

在vue的main文件中写入引用
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
```

写入后的main文件
``` main.js
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
```
##  嵌套路由
[VueRouter路由](https://router.vuejs.org/zh/installation.html)
> Vue Router
* 安装
```
npm install vue-router
```
