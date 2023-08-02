# 集入mysql

## 安装mysql
```yaml
  npm i mysql
```

## 配置mysql
```js
// 1. 导入mysql
const mysql = require('mysql')
// 2. 建立与mysql数据库的链接
const db = mysql.createPool({
    host: '127.0.0.1',// 数据库IP地址
    user: 'root', // 登录数据库名
    password: '', // 登录密码
    database: 'my_test' // 制定要操作哪个数据库
})
```

## 测试mysql模块是否正常工作
```js
db.query('select 1', (err, result) =>{
    if (err) return console.log(err.message)
    console.log('result')
})
```

## 完整示例
```js
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',// 数据库IP地址
    user: 'root', // 登录数据库名
    password: '123456', // 登录密码
    database: 'my_test' // 制定要操作哪个数据库
})

// 插入
db.query('insert into login(id, uname, password) values(?, ?, ?), (?, ?, ?)', [null, '七', '12345', null, '八', '12345'], (err, result) =>{
    if (err) return console.log(err.message)
    if (result.affectedRows === 1) console.log('hello word')
});

// 查询
db.query('select * from login', (err, result) =>{
    if (err) return console.log(err.message)
    console.log(result)
})

// 便捷方式插入
const str = {uname: '王五', password: 'wu123'}
const sqlStr = `insert into login set ?`
db.query(sqlStr, str, (err, result) =>{
    if (err) return console.log(err.message)
    if (result.affectedRows === 1) console.log('hello word')
})
```