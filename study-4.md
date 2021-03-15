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

> 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

```

1: 创建一个view的文件夹

### 1， 页面实现（html模版中）

> 在vue-router中, 我们看到它定义了两个标签<router-link> 和<router-view>来对应点击和显示部分。
> <router-link> 就是定义页面中点击的部分，
> <router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方。
> 所以 <router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去， 如：<router-link  to="/home">Home</router-link>

### 2， js 中配置路由
    
> 首先要定义route,  一条路由的实现。
> 它是一个对象，由两个部分组成： path和component.  
> path 指路径，component 指的是组件。如：{path:’/home’, component: home}
    
* 1: 我们这里有两条路由，组成一个routes: 
```
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About }
]
```
    
* 2: 最后创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。
```
const router = new VueRouter({
    routes // routes: routes 的简写
})
``` 

* 3: 配置完成后，把router 实例注入到 vue 根实例中,就可以使用路由了
```
// main.js中
const app = new Vue({
  router
}).$mount('#app')
```

## 第一个简单的路由示例
>  vue-cli 创建一个项目体验一下, 当然不要忘记安装vue-router

* 1, 在src 目录下新建两个组件
1.1: home.vue 
```
<template>
    <div>
        <h1>home</h1>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "我是home 组件"
            }
        }
    }
</script>
```
about.vue
```
<template>
    <div>
        <h1>about</h1>
        <p>{{aboutMsg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                aboutMsg: '我是about组件'
            }
        }
    }
</script>
```

* 2, 在 App.vue中 定义<router-link > 和 </router-view> 
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <header>
    <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>   
  </div>
</template>

<script>
export default {
  
}
</script>
```


* 3,  在 src目录下再新建一个router.js 定义router, 就是定义 路径到 组件的 映射。
```
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "./home.vue";
import about from "./about.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/home",
        component: home
    },
    {
        path: "/about",
        component: about
    }
]

var router =  new VueRouter({
    routes
})
export default router;
```

* 4， 把路由注入到根实例中，启动路由。这里其实还有一种方法，就像vuex  store 注入到根实例中一样，我们也可以把vueRouter 直接注入到根实例中。在main.js中引入路由，注入到根实例中。
```
import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from "./router.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})
```
* 5， 这时点击页面上的home 和about 可以看到组件来回切换。但是有一个问题，当首次进入页面的时候，页面中并没有显示任何内容。
这是因为首次进入页面时，它的路径是 '/'，我们并没有给这个路径做相应的配置。
一般，页面一加载进来都会显示home页面，我们也要把这个路径指向home组件。
但是如果我们写{ path: '/', component: Home },vue 会报错，因为两条路径却指向同一个方向。
这怎么办？这需要重定向，所谓重定向，就是重新给它指定一个方向，
它本来是访问 / 路径，我们重新指向‘/home’, 它就相当于访问 '/home', 
相应地 home组件就会显示到页面上。vueRouter中用 redirect 来定义重定向。
  
```
const routes = [
    {
        path:"/home",
        component: home
    },
    {
        path: "/about",
        component: about
    },
    // 重定向
    {
        path: '/', 
        redirect: '/home' 
    }
]
```

* 6， 最后，我们看一下路由是怎么实现的
打开浏览器控制台，首先看到 router-link 标签渲染成了 a 标签，
to 属性变成了a 标签的 href 属性，这时就明白了点击跳转的意思。
router-view 标签渲染成了我们定义的组件，其实它就是一个占位符，它在什么地方，匹配路径的组件就在什么地方，
所以 router-link 和router-view 标签一一对应，成对出现。

这里还看到，当点击Home和About 来回切换时，a 标签有一个样式类 .router-link-active 也在来回切换， 
原来这是当router-link 处于选中状态时，vueRouter 会自动添加这个类，因此我们也可以利用这个类来改变选中时的状态，
如选中时，让它变成红色。但当设置 .router-link-active {color: red;}，它并没有生效，这时还要在类前面加一个a, 
a.router-link-active {color: red;}, 
这样就没有问题了。未处于选中状态的router-link， 
我们也想给它更改样式，怎么办? 直接给它添加一个 class 就可以了， 
<router-link class="red">Home</router-link>

