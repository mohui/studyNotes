```javascript
// 删除文件
const pngPath = `./tmp/a.png`;
fs.unlinkSync(pngPath);

```

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
<p>
     1.1: 要想理解结果，我们必须先知道在 Node.js 中，
     异步式 I/O 是通过回调函数来实现的。
</p>
<p>
     1.2: fs.readFile 接收了三个参数，
     第一个是文件名，第二个是编码方式，第三个是一个函数，
     我们称这个函数为回调函数。
</p>

```js
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

## 在百度上复制的,留个备份

node.js中fs文件系统模块的使用
node.js中为我们提供了fs文件系统模块，实现对文件或目录的创建，修改和删除等操作。

fs模块中，所有的方法分为同步和异步两种实现。

有 sync 后缀的方法为同步方法，没有 sync 后缀的方法为异步方法。

一、文件的整个读取
```
const fs = require('fs');
 
//参数一表示读取的文件
//参数二表示读取的配置，{encoding:'null', flag:'r'}
//encoding 表示编码方式
//flag 表示文件系统标志
//如果没有指定参数二中的encoding，则data返回的是一个Buffer
fs.readFile('./1.txt', function (err, data) {
    console.log(data);
});
 
//如果指定了，则data返回的是解析后的字符串
fs.readFile('./1.txt', {'encoding': 'utf8', 'flag': 'r'}, function (err, data) {
    console.log(data);
});　　
```
或同步读取：
```
const fs = require('fs');
 
let data = fs.readFileSync('./1.txt');
console.log(data);
 
let data2 = fs.readFileSync('./1.txt', {'encoding': 'utf8'});
console.log(data2);
```
二、往文件写入数据

```
const fs = require('fs');
 
//参数一表示需要写入的文件
//参数二表示写入的数据
//参数三表示写入配置 {encoding:'utf8', mode:'0o666', flag:'w'}
//encoding 表示文件编码
//mode 表示文件权限
//flag 表示表示文件系统标志
fs.writeFile('./1.txt', '数据', {'mode': 0o666, 'flag': 'w'}, function (err) {
    console.log(err);
});
 
//注意如果文件已存在，默认会覆盖写入
fs.writeFile('./1.txt', '你好', function (err) {
    console.log(err);
});
 
//如果想追加写入，将flag设置为'a'就可以了。
fs.writeFile('./1.txt', '你好', {'flag': 'a'}, function (err) {
    console.log(err);
});
```
注意，writeFile() 默认会以覆盖的方式写入数据。

或者同步写入数据：

```
const fs = require('fs');
 
fs.writeFileSync('./1.txt', '数据');
```
关于 mode 文件权限的说明：

在linux中文件的权限会为3种，4-表示可读，2-表示可写，1-表示可执行。它们之间的相互组合形成不同权限。

对于文件，有三个权限分配，1：文件所有者，2：文件所属组，3：其他用户。

关于 flag 文件系统标志的说明：

r	表示 读取
w 	表示 写入
s 	表示 同步
a 	表示 追加
x 	表示 文件存在就报错
+ 	表示 增加相反操作
     r+ 与 w+ 区别，文件不存在时，r+ 不会创建文件，而 w+ 会创建。如果文件存在 r+ 不会清空文件，而 w+ 会清空文件。

三、往文件中追加数据

```
const fs = require('fs');
 
fs.appendFile('./1.txt', '数据', function (err) {
    console.log(err);
});
 
fs.appendFileSync('./1.txt', '同步追加');
```
四、拷贝文件
```
const fs = require('fs');
 
//参数一表示源文件
//参数二表示目标文件
//参数三表示拷贝操作的修饰符，默认0
//参数四表示回调函数
fs.copyFile('./1.txt', './2.txt', function (err) {
    console.log(err);
});
 
//同步拷贝文件
fs.copyFileSync('./1.txt', './3.txt');
```
五、打开文件，读取文件，写入文件

```
const fs = require('fs');
 
//参数一表示文件路径
//参数二表示文件系统标志
//参数三表示文件权限
//参数四表示回调函数，err表示错误，fd表示文件描述符，是一个整型
fs.open('./1.txt', 'r+', 0o666, function (err, fd) {
    //创建一个3字节的Buffer，用来接收数据
    let rbuf = Buffer.alloc(3);
    //参数一表示文件描述符
    //参数二表示接收数据的Buffer
    //参数三表示往Buffer中写入的偏移量
    //参数四表示读取的字节数
    //参数五表示从文件中读取的位置，如果为null，则是文件的当前位置读取
    //参数六表示回调函数，err表示错误，bytesRead表示实际读取的字节，buffer表示接收数据的Buffer
    fs.read(fd, rbuf, 0, 3, 0, function (err, bytesRead, buffer) {
        console.log(rbuf.toString());
        console.log(bytesRead);
    });
 
    let wbuf = Buffer.from('中国');
    //参数一表示文件描述符
    //参数二表示写入数据的Buffer
    //参数三表示往Buffer中读取的偏移量
    //参数四表示写入的字节数
    //参数五表示从文件中写入的位置，如果不等于数字，则从文件的当前位置写入
    //参数六表示回调函数，err表示错误，written表示实际写入的字节数，buffer表示写入数据的Buffer
    fs.write(fd, wbuf, 0, 3, fs.stat, function (err, written, buffer) {
        console.log(written);
    });
});　
```
六、同步磁盘缓存，把缓冲区数据刷新到文件中。
```
const fs = require('fs');
 
fs.open('./1.txt', 'w+', 0o666, function (err, fd) {
    let data = Buffer.from('数据\n');
    let task = [];
    //我们往文件中循环写入数据
    for (ix = 0; ix < 1000; ix++) {
        task.push(function () {
            return new Promise((resolve, reject) => {
                fs.write(fd, data, 0, data.length, null, function (err, written, buffer) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(written);
                    }
                });
            });
        });
    }
 
    Promise.all(task.map(fn => fn())).then(value => {
        console.log(value);
    }, reason => {
        console.log(reason);
    });
 
    //当们写完数据后，一般会强制刷新缓冲区，让数据写入到文件里，然后关闭文件。
    //因为系统为了效率，我们写入的数据通常会放到一个缓冲区中，当缓冲区满了后，系统就一次把数据写到文件。
    fs.fsync(fd, function (err) {
        console.log(err);
        //关闭文件
        fs.close(fd, function (err) {
            console.log(err);
        })
    });
});
```
七、创建目录
```
const fs = require('fs');
 
//创建目录，默认情况下不支持递归创建目录
fs.mkdir('./a', function (err) {
    console.log(err);
});
 
//通过设置参数二中的recursive为true，则可以递归创建目录
fs.mkdir('./a/b/c', {'recursive': true}, function (err) {
    console.log(err);
});　
```
八、删除目录
```
const fs = require('fs');
 
//rmdir无法删除非空目录
fs.rmdir('./a', function (err) {
    console.log(err);
});
```
九、测试文件或目录是否存在，是否可读，是否可写

```
const fs = require('fs');
 
let path = './a';
 
//判断是否存在
fs.access(path, fs.constants.F_OK, function (err) {
    console.log(err ? '不存在' : '存在');
});
 
//判断是否可读
fs.access(path, fs.constants.R_OK, function (err) {
    console.log(err ? '不可读' : '可读');
});
 
//判断是否可写
fs.access(path, fs.constants.W_OK, function (err) {
    console.log(err ? '不可写' : '可写');
});　
```
十、读取目录下的所有文件
```
const fs = require('fs');
const path = require('path');
 
//读取目录下所有文件
fs.readdir('./a', function (err, files) {
    console.log(files);
});
 
//递归的读取一个目录所有文件
function readDir(dir) {
    fs.stat(dir, function (err, stats) {
        if (stats.isDirectory()) {
            console.log(dir);
            fs.readdir(dir, function (err, files) {
                files.map(value => {
                    let cur = path.join(dir, value);
                    fs.stat(cur, function (err, stats) {
                        if (stats.isDirectory()) {
                            readDir(cur);
                        } else {
                            console.log(cur);
                        }
                    });
                });
            });
        } else {
            console.log(dir);
        }
    });
}
readDir('./node_modules');
```
十一、查看文件或目录的详细信息

```
const fs = require('fs');
 
//获取目录详细信息
fs.stat('./a', function (err, stats) {
    console.log(stats);
});
 
//获取文件详细信息
fs.stat('./1.txt', function (err, stats) {
    console.log(stats);
});
```
stats.size 表示文件大小。

stats.atime 表示文件中的数据最后访问时间。

stats.mtime 表示文件中的内容修改最后时间。

stats.ctime 表示文件权限，拥有者，所属组，链接数发生改变时的时间。

stats.birthtime 表示文件创建时间。

十二、重命名或移动文件

```
const fs = require('fs');
 
//重命名文件
fs.rename('./1.txt', './b.txt', function (err) {
    console.log(err);
});
 
//移动文件
fs.rename('./2.txt', './a/b/c/2.txt', function (err) {
    console.log(err);
});
```
十三、删除文件
```
const fs = require('fs');
 
//删除文件
fs.unlink('./3.txt', function (err) {
    console.log(err);
});
```
十四、截取文件

```
const fs = require('fs');
 
//截取文件成3个字节
fs.truncate('./b.txt', 3, function (err) {
    console.log(err);
});
```
十五、监视文件或目录的状态改变

```
const fs = require('fs');
 
//监视目录
fs.watchFile('./a', function (curr, prev) {
    console.log(curr);
    console.log(prev);
 
    if (curr.mtimeMs !== prev.mtimeMs) {
        console.log('内容发生的改变');
    }
});
```