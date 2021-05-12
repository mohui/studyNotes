# router学习笔记

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