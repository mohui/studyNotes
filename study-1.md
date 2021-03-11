# nodejs简介
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
    res.write('Node.js');
    res.end('Hello World');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");

```

<p>1: 在终端中运行这个脚本时，我们会发现它并不像 Hello World 一样结束后立即退出，而是一直等待，直到按下 Ctrl + C 才会结束。
这是因为 listen 函数中创建了事件监听器，使得 Node.js 进程不会退出事件循环
</p>


supervisor 可以帮助你实现这个功能，它会监视你对代码的改动，并自动重启 Node.js。使用方法很简单，
首先使用 npm 安装 supervisor：$ npm install -g supervisor

# 模块和包
<p></p>
<p> Node.js提供了 exports和require 两个对象，其中exports是模块公开的接口，require用于从外部获取一个模块的接口，即所获取模块的exports对象</p>


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
2: 全局对象的属性;  
3: 隐式定义的变量(未定义直接赋值的变量)。  

当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。  
需要注意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文