<h1>nodejs简介</h1>
<p></p>
<p>1: node.js 不是一种独立的语言,不是一个JavaScript框架,不是浏览器端的库, nodejs是一个可以让 JavaScript 运行在服务器端的开发平台。<p>
<p>2: node.js 最大的特点就是采用异步式 I/O 与事件驱动的架构设计</p>
<p>3: node.js 数据查询: db.query('SELECT * from some_table', function(res) {   res.output(); }); </p>
<p>4: 第一个node.js程序 webstorm里创建test.js文件 console.log('Hello World'); 
打开终端，进入 test.js 所在的目录，执行以下命令：node test.js 在终端中看到输出Hello World</p>
<p>5: 连续两次control + c 可以退出node的REPL模式</p>
<p>6: 创建package.json文件</p>

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

<h2>第一个node服务</h2>
```
const http = require("http");

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");

```

<p>1: 在终端中运行这个脚本时，我们会发现它并不像 Hello World 一样结束后立即退出，而是一直等待，直到按下 Ctrl + C 才会结束。
这是因为 listen 函数中创建了事件监听器，使得 Node.js 进程不会退出事件循环
</p>


supervisor 可以帮助你实现这个功能，它会监视你对代码的改动，并自动重启 Node.js。使用方法很简单，
首先使用 npm 安装 supervisor：$ npm install -g supervisor