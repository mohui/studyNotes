https://www.bilibili.com/video/BV1Su411q71n?p=7&spm_id_from=pageDriver&vd_source=39f266c622d872c7f9fb6ec3d2ad3a60

https://www.bilibili.com/video/BV1YW4y1V7UT/?p=2&spm_id_from=pageDriver&vd_source=39f266c622d872c7f9fb6ec3d2ad3a60

### 根据vite创建项目
```
npm init vite
```
- 写项目的名称 eg: vue-project
- 选ts
- 按照上面提示安装包 npm install
- 按照上面提示运行 npm run dev

### 可以在 vite.config.ts 改端口
```ts
server: {
    port: 3001
}
```
- 完整代码
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [vue()],
})
```

### 支持ts
```yaml
npm i @types/node --save-dev
```

#### 取别名
```js
import path from 'path'
export default defineConfig({
    server: {
        port: 3001
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname,)
        }
    },
    plugins: [vue()],
})
```

## 安装路由
[vueRouter](https://router.vuejs.org/zh/installation.html#yarn)
- -D 等同于–save-dev 主要下载的是构建工具 或者是测试工具 （babel webpack）
- -S 等同于–save 开发中的框架 库文件 vue react
- 一般在测试环境中使用的可以使用 -D 
- 一般在项目使用的时候使用 -S

```yaml
npm add vue-router -S
或
npm install vue-router@4
或
npm install vue-router@next
```
### src下建立router文件夹, 里面创建index.ts文件
- src/router/index.ts
```ts
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

// 路由项
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/home/index.vue')
    }
]
//路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
export default router;
```
### 转到main.ts
```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')

```