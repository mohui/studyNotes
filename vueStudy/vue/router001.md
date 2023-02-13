- 路由核心: 改变URL, 但是页面不进行整体刷新, 路由理解为指向

## 不同的历史模式
### Hash 模式
- createWebHashHistory: 有#
### HTML5 模式
- createWebHistory: 没有#

## 路由
- 路由表, 是一个映射表. 一个路由就是一组映射关系  
- key-value => key: 表示路由, value: 可以为function 或者 Component
- function: 后端路由
- Component: 前端路由
- alias: 取别名
- props: 必须设置为true, 才能用props接收值


## 路由映射
- Home: 首页
- About: 指定的路由
- News: 参数正则校验
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
    // 正则匹配纯数字
    {
        path: "/news/:id(\\d+)",
        component: News
    },
    // 有多个参数
    {
        path: "/news/:id+",
        component: News1
    },
    // 参数可有可无, * 也可换成用 ? , 但是参数不可以重复叠加
    {
        path: "/news/:id*",
        component: News2
    },
    {
        path: '/:path(.*)',
        component: NotFound
    },
    
]
```

### 取别名
- alias: 单个的后跟字符串, 可以取多个别名, 用数组[]
```js
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        alias: '/h',
        component: About
    },
    {
        path: '/about',
        alias: ['/a', '/b'],
        component: About
    }
]
```

## 超链接跳转
### 基本
```vue
<script >
this.$router.push('/');
</script>
```
### 通过传入对象
```vue
<script >
this.$router.push({
  path: "/"
});
</script>
```
### 通过名字(命名路由), 可以带参数
```vue
<script >
this.$router.push({
  name: 'patient',
  query: {
    id: 123
  }
});
</script>
```
### replace 替换
```vue
<script >
this.$router.push({path: "about", query: {id: 123}, replace: true})
</script>

```vue
<script >
this.$router.replace({path: "about", query: {id: 123}})
</script>
```

### 后退
- go(): 传入正值为前进, 传入负值为后腿
- go(-1): this.$router.back()
- go(1): this.$router.forward()
```vue
<script >
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
```
