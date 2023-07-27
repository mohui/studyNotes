# 局部生效的中间件
> 不使用`app.use()`的中间件,叫做`局部生效的中间件`
## 局部生效的中间件示例代码
```js
const express = require('express')

const app = express()

// 定义中间件函数
const mwl = (req, res, next) => {
    console.log('调用了局部中间件')
    next()
}

app.get('/', mwl, (req, res) => {
    res.send('测试')
})

app.get('/user', (req, res) => {
    res.send('测试')
})
```

## `错误级别`的中间件
> 专门用来捕获整个项目发生的异常错误, 从而防止项目异常崩溃的问题
### 错误级别的中间件, 必须注册在所有路由之后
> `格式`:错误级别中间件的`function`处理函数中, 必须有4个形参, 形参顺序从前到后分别是(err, req, res, next)

```js
app.get('/', function(req, res) {
    throw new Error('服务器错误')
    res.send('HomePage')
})

app.use(function(err, req, res, next) {
    console.log('发生了错误' + err.message);
    res.send('Error' + err.message)
})
```