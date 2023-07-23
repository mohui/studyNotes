# nodejs简介
1. node.js 不是一种独立的语言,不是一个JavaScript框架,不是浏览器端的库, nodejs是一个可以让 JavaScript 运行在服务器端的开发平台。
2. node.js 最大的特点就是采用异步式 I/O 与事件驱动的架构设计
3. node.js 数据查询: db.query('SELECT * from some_table', function(res) {   res.output(); }); 
4. 第一个node.js程序 webstorm里创建test.js文件 console.log('Hello World'); 
5. 打开终端，进入 test.js 所在的目录，执行以下命令：node test.js 在终端中看到输出Hello World
6. 连续两次control + c 可以退出node的REPL模式
7. 创建package.json文件

```
{
  "name": "nodeProjects",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "http-proxy-middleware": "^1.0.6"
  }
  
  
```
<p>执行 npm install</p>

## 第一个node服务


```
const http = require("http");

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Node.js');
    res.end('Hello World');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");

```
1. 在终端中运行这个脚本时，我们会发现它并不像 Hello World 一样结束后立即退出，而是一直等待，直到按下 Ctrl + C 才会结束。
2. 这是因为 listen 函数中创建了事件监听器，使得 Node.js 进程不会退出事件循环
3. 这段代码中，http.createServer 创建了一个 http.Server 的实例，将一个函数 作为 HTTP 请求处理函数。
4. 这个函数接受两个参数，分别是请求对象( req )和响应对象 ( res )。  
5. 在函数体内，res 显式地写回了响应代码 200 (表示请求成功)，  
6. 指定响应头为 'Content-Type': 'text/html'，然后写入响应体 "Node.js"， 
7. 通过 res.end 结束并发送。 
8. 最后该实例还调用了 listen 函数，启动服务器并监听 3000 端口。

### http.Server
http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被封装为独立的事件， 开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。
它继承自 EventEmitter，提供了以下几个事件。
>request:当客户端请求到来时，该事件被触发，提供两个参数 req 和res，分别是 http.ServerRequest和http.ServerResponse 的实例，表示请求和响应信息。
>connection:当 TCP 连接建立时，该事件被触发，提供一个参数 socket，为 net.Socket 的实例。
>connection 事件的力度要大于 request，因为客户端在 Keep-Alive 模式下可能会在同一个连接内发送多次请求
>close :当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

除此之外还有 checkContinue、upgrade、clientError 事件，通常我们不需要关 心，只有在实现复杂的 HTTP 服务器的时候才会用到。
在这些事件中，最常用的就是 request 了，因此 http 提供了一个捷径: http.createServer([requestListener]) ，
 功能是创建一个HTTP服务器并将 requestListener 作为 request 事件的监听函数，这也是我们前面例子中使用的方法。 
 事实上它显式的实现方法是:

```
const http = require('http');
const server = new http.Server();
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}); server.listen(3000);
console.log("HTTP server is listening at port 3000.");
```

### http.ServerRequest
http.ServerRequest 是 HTTP 请求的信息，是后端开发者最关注的内容。它一般由
http.Server 的 request 事件发送，作为第一个参数传递，通常简称 request 或 req。 ServerRequest 提供一些属性，
HTTP 请求一般可以分为两部分:请求头(Request Header)和请求体(Requset Body)。   
以上内容由于长度较短都可以在请求头解析完成后立即读取。
而请求体可能相对较长， 需要一定的时间传输，因此 http.ServerRequest 提供了以下3个事件用于控制请求体传输。
>1: data :当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，
>表示接 收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调用多次。
>2: end :当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
>3: close: 用户当前请求结束时，该事件被触发。不同于 end，如果用户强制终止了传输，也还是调用close
>
 complete : 客户端请求是否已经发送完成
 httpVersion: HTTP 协议版本，通常是 1.0 或 1.1
 method: HTTP 请求方法，如 GET、POST、PUT、DELETE 等
 url: 原始的请求路径，例如 /static/image/x.jpg 或 /user?name=byvoid
 headers: HTTP 请求头
 trailers: HTTP 请求尾(不常见)
 connection: 当前 HTTP 连接套接字，为 net.Socket 的实例 
 socket: connection 属性的别名
 client:  client 属性的别名
 
### 获取 GET 请求内容

```
const http = require('http');
const url = require('url');
const util = require('util');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
```
> 在浏览器中访问 http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com
> 通过 url.parse1，原始的 path 被解析为一个对象，其中 query 就是我们所谓的 GET 请求的内容，而路径则是 pathname

### 获取 POST 请求内容


~~supervisor 可以帮助你实现这个功能，它会监视你对代码的改动，并自动重启 Node.js。  
使用方法很简单，首先使用 npm 安装 supervisor：    
$ npm install -g supervisor~~

# 模块和包
>Node.js提供了 exports和require 两个对象，
>exports是模块公开的接口，
>require用于从外部获取一个模块的接口，即所获取模块的exports对象


## package.json 

>是 CommonJS 规定的用来描述包的文件，  
完全符合规范的 package.json 文件应该含有以下字段。  
***
>
name：包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。  
description：包的简要说明。  
version：符合语义化版本识别①规范的版本字符串。  
keywords：关键字数组，通常用于搜索。  
maintainers：维护者数组，每个元素要包含name、email（可选）、web（可选）字段。  
contributors：贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素。  
bugs：提交bug的地址，可以是网址或者电子邮件地址。  
licenses：许可证数组，每个元素要包含type（许可证的名称）和url（链接到许可证文本的地址）字段。  
repositories：仓库托管地址数组，每个元素要包含type （仓库的类型，如git）、url（仓库的地址）和path（相对于仓库的路径，可选）字段  
dependencies：包的依赖，一个关联数组，由包名称和版本号组成  

<p>
①语义化版本识别（Semantic Versioning）
是由 Gravatars 和 GitHub 创始人 Tom Preston-Werner 提出的一套版本命名规范，
最初目的是解决各式各样版本号大小比较的问题，目前被许多包管理系统所采用。
</p>

## npm
>npm是 Node.js 官方提供的包管理工具  
使用 npm 安装包的命令格式为：npm [install/i] [package_name]   
例如你要安装 express，     
可以在命令行运行： 
``` 
$ npm install express   
```
或者：
```  
$ npm i express  
```

## 全局变量 
global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条件的变量是全局变量:  
>1: 在最外层定义的变量;  
>2: 全局对象的属性;  
>3: 隐式定义的变量(未定义直接赋值的变量)。  

当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。  
需要注意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文


#### 清除npm缓存
```yaml
npm cache clean -f
```
