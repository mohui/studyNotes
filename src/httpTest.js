const http = require("http");

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World node is good</p>');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");