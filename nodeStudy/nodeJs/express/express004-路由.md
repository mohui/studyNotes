## 路由基础
```js

const express = require('express')

// 创建web服务器
const app = express()

// 挂载路由 get
app.get('/',(req,res)=>{
    res.send('hello get.')
})

app.post('/',(req,res)=>{
    res.send('hello post.')
})

app.listen(80, () => {console.log('127.0.0.1')})
```