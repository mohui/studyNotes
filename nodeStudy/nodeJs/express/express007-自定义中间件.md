## 监听`req`的`end`事件
> 当请求体数据`接受完毕`后, 会自动触发`req.end`的事件
- 因此 我们可以在req的end事件中, 拿到并处理完整的请求提数据
```js
req.on('end', ()=> {
    
})
```

## 将解析出来的数据对象挂载为`req.body`
> `上游`的`中间件`,和`下游`的`中间件及路由`之间,`共享同一份req和 res`
>   
> 因此我们可以将解析出来的数据, 挂载为 req 的自定义属性, 命名为`req.body`供下游使用
```js
req.on('end', () =>{
    const body = qs.parse(str)
    // 将解析出来的请求体对象, 挂载为`req.body`属性
    req.body = body
    // 最用一定要调用`next()`函数,执行后续的业务逻辑
    next()
})
```


## 自定义中间件示例代码
```js
// 导入 express 模块
const express = require('express')
// 创建express 的服务器示例
const app = express();

// 导入nodejs内置的querystring模块
const qs = require('querystring')

// 这是解析表单数据的中间件
app.use((req, res, next) => {
    // 定义中间件具体的业务逻辑

    // 1. 定义一个str字符串, 专门用来存储客户端发送过来的请求体数据
    let str = ''
    // 2. 监听req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk
    })
    // 3. 监听 req 的 end 事件
    req.on('end',() =>{
        // 在str中存放的是完整的请求体数据
        console.log(str)
        const newStr = qs.parse(str)
        console.log(newStr)
        // TODO: 把字符串格式的请求提数据, 解析成对象格式
        req.body = newStr
        next()
    })
})

app.post('/user', (req, res) =>{
    res.send(req.body)
})


// 调用app.listen方法, 制定端口号并启动web服务器
app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```

## 封装上面的代码
### 封装为 `exports.js`
```js

// 导入nodejs内置的querystring模块
const qs = require('querystring')

const bodyParser = (req, res, next) => {
    // 定义中间件具体的业务逻辑

    // 1. 定义一个str字符串, 专门用来存储客户端发送过来的请求体数据
    let str = ''
    // 2. 监听req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk
    })
    // 3. 监听 req 的 end 事件
    req.on('end',() =>{
        // 在str中存放的是完整的请求体数据
        console.log(str)
        const newStr = qs.parse(str)
        console.log(newStr)
        // TODO: 把字符串格式的请求提数据, 解析成对象格式
        req.body = newStr
        next()
    })
}

module.exports = bodyParser
```

### 导入封装`exports.js`,运行 `express.js`
```js
// 导入 express 模块
const express = require('express')
// 创建express 的服务器示例
const app = express();

// 导入自己封装的中间件模块
const customBody = require('./exports')
// 这是解析表单数据的中间件
app.use(customBody)

app.post('/user', (req, res) =>{
    res.send(req.body)
})


// 调用app.listen方法, 制定端口号并启动web服务器
app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```