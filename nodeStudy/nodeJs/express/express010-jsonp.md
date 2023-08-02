# JSONP接口
##  概念
> 浏览器端通过, `<script>` 标签的`src`属性, 请求服务器上的数据, 同时,服务器返回一个函数的调用, 这种请求数据的方式叫做JSONP
## 特点
> 1. jsonp不属于真正的`Ajax`请求, 因为它没有使用`XMLHttpRequest`这个对象
> 2. jsonp仅支持GET请求, 不支持POST.PUT.DELETE等请求

## 创建jsonp接口的注意事项
> 如果项目中已经配置了`cors`跨域资源共享, 为了防止冲突
> 必须在配置CORS中间件之前声明JSONP的接口, 否则jsonp接口会被处理成开启了CORS的接口

```js
// 优先创建jsonp接口, (这个接口不会被处理成CORS接口)
app.get('/api/jsonp', (req, res) => {})

// 在配置CORS中间件, [后续的所有接口, 都会被处理成 CORS接口]
app.use(cors())

// 这是一个开启了CORS的接口
app.get('/api/get', (req, res) => { })
```

## 实现jsonp皆苦的步骤
> 1. 获取客户端发送过来的回调函数的名字
> 2. 得到要通过jsonp形式发送给客户端的数据
> 3. 根据前两步得到的数据, 拼接出一个函数调用的字符串
> 4. 把上一步拼接得到的字符串, 响应给客户端的`<script>`标签进行解析执行
```js
app.get('api/jsonp', (req, res) => {
    // 1. 获取客户端发送过来的回调函数的名字
    const funcName = req.query.callback;
    // 2. 得到要通过jsonp形式发送给客户端的数据
    const data = {name: 'zs', age: 22}
    // 3. 根据前两步得到的数据, 拼接出一个函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    // 4. 把上一步拼接得到的字符串, 响应给客户端的`<script>`标签进行解析执行
    res.send(scriptStr)
})
```