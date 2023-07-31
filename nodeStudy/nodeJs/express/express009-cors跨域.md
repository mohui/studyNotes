# CORS跨域问题
* cors主要在服务器端配置, 客户端浏览器无需做任何额外的配置
* cors 在浏览器中有兼容性, 只支持XMLHttpRequest Level2的浏览器

## CORS 响应头部
> `CORS`(跨域资源共享)由一系列`http响应头`组成, 这些http响应头决定浏览器是否组织前端js代码跨域获取资源
### 安装`cors`
````yaml
npm i cors
````
### 使用`cors`
```js
// 引用
const cors = require('cors')
// 在路由之前调用
app.use(cors())
```

### `CORS 响应头部` - Access-Control-Allow-Origin
- 如果制定`Access-Control-Allow-Origin`字段的值为通配符*, 表示允许来自任何域的请求
```js
res.setHeader('Access-Control-Allow-Origin', '*')
```
### `CORS 响应头部` - Access-Control-Allow-Headers
> 默认情况下, CORS仅支持客户端向服务器发送如下9个请求头
- Accept
- Accept-Language
- Content-Language
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width
- Content-Type
> 值仅限于`text/plain`,`multipart/form-data`,`application/x-www-form-urlencoded`三者之一

> 如果客户端向服务器发送了额外的请求头信息, 则需要在服务器端, 
> 通过Access-Control-Allow-Headers  对额外的请求头进行声明, 否则这次请求会失败
```js
// 允许客户端额外向服务器发送 Content-Type请求头和 X-Custom-Header 请求头
// 注意, 多个请求头之间使用英文的逗号进行分割
res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'X-Custom-Header')
```

### `CORS 响应头部` - Access-Control-Allow-Methods
> 默认情况下, CORS 仅支持客户端发起GET,POST,HEAD请求

> 如果客户端希望通过`PUT`,`DELETE`等方式请求服务器的资源, 则需要在服务器端, 
> 通过`Access-Control-Allow-Methods`来指明实际请求所允许使用的http方法
```js
// 只允许 POST, GET, DELETE, HEAD 请求方法
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
// 允许所有的HTTP请求方式
res.setHeader('Access-Control-Allow-Methods', '*')
```

## CORS 跨域资源共享
### 简单请求和预测请求的区别
- 简单请求的特点: 客户端和服务器之间只会发生一次请求
- 预测请求的特点: 客户端和服务器之间会发生两次请求, OPTION 预检请求成功之后, 才会发起真正的请求

#### 简单请求
- 同时满足以下两大条件的请求, 就属于简单请求
> 请求方式:GET, POST, HEAD 三者之一

> HTTP头部信息不超过以下几种字段: 
> 无定义头部字段(Accept ,Accept-Language ,Content-Language , DPR, Downlink, Save-Data, Viewport-Width, Width, Content-Type)
> 只有三个值(text/plain,multipart/form-data,application/x-www-form-urlencoded)


#### 预检请求
- 只要符合一下任何一个条件的请求, 都需要进行预检请求
> 请求方式为 GET, POST, HEAD 之外的请求 Method类型

> 请求头中包含 自定义头部字段

> 向服务器发送了`application/json`格式的数据

- 解释
> 在浏览器与服务器正式通信之前, 浏览器会先发送OPTION请求进行预检, 以获知服务器是否允许该实际请求,
> 所以这一次的OPTION请求称为`预检请求`.
> 服务器成功响应预检请求后, 才会发送真正的请求, 并且携带真实数据

