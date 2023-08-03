# session的简单用法
## 安装session 
````yaml
npm install express-session
````
## 配置中间件
- app.use()
```js
// 导入session中间件
var session = require('express-session')
// 配置session中间件
app.use(session({
    secret: 'xzmc',  // secret属性的值可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true // 固定写法
}))

```

## 完整代码示例
```js
// 导入 express 模块
const express = require('express')
// 创建express 的服务器示例
const app = express();

app.use(express.urlencoded({extended: false}))

// 导入session
const session = require('express-session');
/// 配置session中间件
app.use(session({
    secret: 'xzmc',
    resave: false,
    saveUninitialized: true
}))

app.post('/login', (req, res) => {
    const body = req.body;

    if (body.username !== 'admin' && body.password !== '123456')
        return res.send({
            status: 1,
            msg: '登录失败',
            data: body // 需要响应给客户端的数据
        })

    req.session.user = body
    req.session.isLogin = true
    // 调用 res.send()方法, 向客户端相应处理的结果
    return res.send({
        status: 0,
        msg: 'login调用成功',
        data: body // 需要响应给客户端的数据
    })
})

app.post('/username', (req, res) => {
    // 通过req.body,获取请求中包含的`url-encoded`格式的数据
    console.log(req.session)
    console.log(req.session.user)
    console.log(req.session.isLogin)
    // 调用 res.send()方法, 向客户端相应处理的结果
    res.send({
        status: 0,
        msg: 'post调用成功',
        data: req.session.user // 需要响应给客户端的数据
    })
})


app.post('/logout', (req, res) => {
    req.session.destroy()

    // 调用 res.send()方法, 向客户端相应处理的结果
    res.send({
        status: 0,
        msg: '登出成功',
    })
})

// 调用app.listen方法, 制定端口号并启动web服务器
app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```