# get接口和post接口实现
#### router.js
```js
const express = require('express')

const router = express.Router()

// 在这里挂载路由
router.get('/get', (req, res) => {
    // 通过req.query获取客户端通过查询字符串,发送到服务器的数据
    const query = req.query;

    // 调用 res.send()方法, 向客户端相应处理的结果
    res.send({
        status: 0,
        msg: 'get调用成功',
        data: query // 需要响应给客户端的数据
    })
})

router.post('/post', (req, res) => {
    // 通过req.body,获取请求中包含的`url-encoded`格式的数据
    const body = req.body;
    // 调用 res.send()方法, 向客户端相应处理的结果
    res.send({
        status: 0,
        msg: 'post调用成功',
        data: body // 需要响应给客户端的数据
    })
})

module.exports = router
```

#### express
```js
// 导入 express 模块
const express = require('express')
// 创建express 的服务器示例
const app = express();

app.use(express.urlencoded({extended: false}))

// 导入自己封装的中间件模块
const router = require('./route')
// 这是解析表单数据的中间件
app.use('/api', router)


// 调用app.listen方法, 制定端口号并启动web服务器
app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```