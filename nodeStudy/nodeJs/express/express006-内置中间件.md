# express 内置中间件
> 自Express 4.16.0版本开始, Express 内置了3个常用的中间件, 极大的提高了Express项目的开发效率和体验

## express.static
> `express.static`快速托管静态资源的内置中间件

> eg: `HTML文件`, `图片`, `css样式`等(无兼容性)

## express.json
> `express.json`: 解析`json格式的请求体数据`(有兼容性, 仅在4.16.0+版本中可用)

## express.urlencoded
> `express.urlencoded`: 解析`URL-encoded`格式的请求体数据(有兼容性, 仅在4.16.0+版本中可用)