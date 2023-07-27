## 创建一个js 文件，直接打印 module
```js
console.log(module)
```
- 打印结果如下
```
{
  id: '.',
  path: 'D:\\Projects\\whh\\study',
  exports: {},
  filename: 'D:\\Projects\\whh\\study\\modelStudy1.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\Projects\\whh\\study\\node_modules',
    'D:\\Projects\\whh\\node_modules',
    'D:\\Projects\\node_modules',
    'D:\\node_modules'
  ]
}
```

#### 在外界使用`require`导入一个自定义模块的时候，得到的成员就是模块中 通过 `module.exports`指向的那个对象

#### module向外
```js
module.exports.username = 'zs'
module.exports.sayHello = function () {
    console.log('hello word')
}
```
