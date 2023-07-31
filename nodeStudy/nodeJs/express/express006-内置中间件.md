# express 内置中间件
> 自Express 4.16.0版本开始, Express 内置了3个常用的中间件, 极大的提高了Express项目的开发效率和体验

## express.static
> `express.static`快速托管静态资源的内置中间件

> eg: `HTML文件`, `图片`, `css样式`等(无兼容性)

## express.json
> `express.json`: 解析`json格式的请求体数据`(有兼容性, 仅在4.16.0+版本中可用)

## express.urlencoded
> `express.urlencoded`: 解析`URL-encoded`格式的请求体数据(有兼容性, 仅在4.16.0+版本中可用)


### 配置解析`application/json`格式数据的内置中间件
```js
app.use(express.json())
```

### 配置解析 `application/x-www-form-urlencoded`格式数据的内置中间件
```js
app.use(express.urlencoded({extended:false}))
```

#### 示例代碼

```js
const express = require('express')
const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.post('/user',(req, res) =>{
    console.log(req.body)
    res.send('ok')
})


app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```

## `body-parser`中间件解析表单数据
- 和`express.urlencoded`用法几乎一致
```yaml
 npm install body-parser
```
### `body-parser`示例代码
```js
const express = require('express')
const app = express();

// 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')

app.use(parser.urlencoded({extended: false}))

app.post('/user',(req, res) =>{
    console.log(req.body)
    res.send('ok')
})


app.listen(80, function () {
    console.log('地址: http://127.0.0.1')
})
```