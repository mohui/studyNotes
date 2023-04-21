const fs = require('fs');

// node.js 中异步的方式读取一个文件
fs.readFile('./tmp/test.txt', 'utf-8', function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
console.log('end.');

// end.
// hello, every body


// node.js 中同步的方式读取一个文件
const data = fs.readFileSync('./tmp/test.txt', 'utf-8');
console.log(data);
console.log('end.');
// hello, every body
// end.