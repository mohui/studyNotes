- 路由核心: 改变URL, 但是页面不进行整体刷新, 路由理解为指向

## 路由
- 路由表, 是一个映射表. 一个路由就是一组映射关系
- key-value => key: 表示路由, value: 可以为function 或者 Component
- function: 后端路由
- Component: 前端路由

## 路由映射
- Home: 首页
- About: 指定的路由
- NotFound: 通过正则, 匹配任意找不到的时候跳转的页面
```js
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/:path(.*)',
        component: NotFound
    },
    
]
```