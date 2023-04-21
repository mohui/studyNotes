// ----------示例1----------

// const myModule = require('./exportTest');
// myModule.setName('魔辉');
// myModule.sayHello();

// ----------示例2----------

// const hello1 = require('./exportTest');
// hello1.setName('魔辉');
// const hello2 = require('./exportTest');
// hello2.setName('神辉');
//
// hello1.sayHello();


const Hello = require('./exportTest');

const hello = new Hello();
hello.setName('魔辉');
hello.sayHello();



// //设置主机名
// const hostName = '127.0.0.1';
// //设置端口
// const port = 1011;
// //创建服务
// const server = http.createServer(function(req,res){
//     res.setHeader('Content-Type','text/plain');
//     res.end("hello nodejs");
//
// });
// server.listen(port,hostName,function(){
//     console.log(`服务器运行在http://${hostName}:${port}`);
// });