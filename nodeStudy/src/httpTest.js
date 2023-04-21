// const http = require("http");
//
// const server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Node.js</h1>');
//     res.end('<p>Hello World node is good</p>');
// });
// server.listen(3000);
// console.log("HTTP server is listening at port 3000.");

// 这段代码中，http.createServer 创建了一个 http.Server 的实例，将一个函数 作为 HTTP 请求处理函数。
// 这个函数接受两个参数，分别是请求对象( req )和响应对象 ( res )。
// 在函数体内，res 显式地写回了响应代码 200 (表示请求成功)，指定响应头为 'Content-Type': 'text/html'，然后写入响应体 '<h1>Node.js</h1>'，
// 通过 res.end 结束并发送。最后该实例还调用了 listen 函数，启动服务器并监听 3000 端口。



// const http = require('http');
// const server = new http.Server();
// server.on('request', function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Node.js</h1>');
//     res.end('<p>Hello World</p>');
// }); server.listen(3000);
// console.log("HTTP server is listening at port 3000.");


// GET
const http = require('http');
const url = require('url');
const util = require('util');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
// 在浏览器中访问 http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com
// 通过 url.parse1，原始的 path 被解析为一个对象，其中 query 就是我们所谓的 GET 请求的内容，而路径则是 pathname
