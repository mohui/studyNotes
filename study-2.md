# fs简介
<p></p>

<p>0.1: 实现对文件或目录的创建，修改和删除等操作</p>
<p>0.2: fs模块中，所有的方法分为同步和异步两种实现。</p>
<p>0.3: 有 sync 后缀的方法为同步方法，没有 sync 后缀的方法为异步方法。</p>


## 也可以不用默认的fs
```
npm install fs-extra
```

### 1: 异步读取文件
<p>1.1: 要想理解结果，我们必须先知道在 Node.js 中，异步式 I/O 是通过回调函数来实现的。</p>
<p>1.2: fs.readFile 接收了三个参数，第一个是文件名，第二个是编码方式，第三个是一个函数，我们称这个函数为回调函数。</p>

```
const fs = require('fs');

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
```

### 同步读取文件
```
const fs = require('fs');

const data = fs.readFileSync('./tmp/test.txt', 'utf-8');
console.log(data);
console.log('end.');
// hello, every body
// end.
```