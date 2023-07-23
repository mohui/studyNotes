### 托管静态资源
- 如果要托管多个静态资源目录, 请多次调用`express.static()`函数
- 假如`public`和`whh`里都有index,默认会调用`public`的,因为它在前面
```js

app.use(express.static('public'))

app.use(express.static('whh'))
```

### 挂载路径前缀
```js
app.use('/public',express.static('./public'))

app.use('/whh', express.static('./whh'))
```