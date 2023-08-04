# jwt
> jwt是目前最流行的跨域认证解决方案

## jwt组成部分
> 1. JWT通常由三部分组成, 分别是`Header(头部)`,`Payload(有效荷载)`, `Signature(签名)`.  
> 2. 三者之间使用因为的`.`分割,格式如下
```js
Header.Payload.Signature
```
> 3. `Payload`部分才是真正的用户信息, 他是用户信息经过加密之后生成的字符串
> 4. `Header`和`Signature`是安全性相关的部分, 只是为了保障Token的安全性

## JWT 的使用方式
> 1. 客户端收到服务器返回的JWT之后, 通常会将他储存在`localStorage`或`sessionStorage`中
> 2. 此后, 客户端每次与服务器通信,都要带上这个JWT的字符串, 从而进行身份认证
> 3. 推荐做法是把`JWT`放在`HTTP`请求头的`Authorization`字段中.格式如下
```
Authorization: Bearer <token>
```

## 安装包
```yaml
npm i jsonwebtoken

npm i express-jwt
```

## 导入包
```js
// 1. 导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken')
// 2. 导入用于将客户端发送过来的JWT字符串,解析还原成 JSON对象的包
const expressJWT = require('express-jwt')
```

## 定义secret秘钥
> 为了保证JWT字符串的安全性, 防止JWT字符串在网络传输过程中被别人破解, 我们需要定义一个用于加密解密的secret秘钥

> 1. 当生成JWT字符串的时候, 需要使用secret秘钥对用户信息进行加密, 最终得到加密好的JWT字符串
> 2. 当把JWT字符串解析还原成JSON对象的时候, 需要使用secret秘钥进行解密

