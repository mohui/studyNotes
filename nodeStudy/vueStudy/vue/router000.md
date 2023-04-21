# router学习笔记
[vueRouter](https://router.vuejs.org/zh/installation.html#yarn)
- 路由表, 是一个映射表. 一个路由就是一组映射关系
- key-value => key: 表示路由, value: 可以为function 或者 Component
- function: 后端路由
- Component: 前端路由
- 路由核心: 改变URL, 但是页面不进行整体刷新, 路由理解为指向
- alias: 取别名
- props: 必须设置为true, 才能用props接收值

## 不同的历史模式
### Hash 模式
- createWebHashHistory: 有#
### HTML5 模式
- createWebHistory: 没有#


## 安装 route
```
npm install vue-router
```

## router示例代码
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件
import Layout from './view/layout/layout.vue';
import school from "./view/home/children/school.vue";

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: "school",
                    name: "school",
                    component: school
                },
                // 可以写成这样
                {
                    path: "hospital",
                    name: "hospital",
                    // 上面不用特意引入了,可以直接在这里写
                    component: () => import('./view/home/children/hospital.vue')
                },
            ]
        }
    ]
})

export default router;
```