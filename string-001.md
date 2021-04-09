### console的用法
```javascript
// 简单打印
console.log();
// 打印执行时间
console.time("push");
console.timeEnd("push");
```

### 数字
```javascript
// 保留两位小数
const number = (3/10).toFixed(2)
// 保留整数部分（丢弃小数部分）
const number = parseInt(1.2345);
// 向下取整
const number = Math.floor(1.2345);
// 向上取整
const number = Math.ceil(1.2345);
// 四舍五入
const number = Math.round(1.2345);
// 取绝对值
const number = Math.abs(-1);
// 返回两数中的较大者
const number = Math.max(1,2);
// 返回两数中的较小者
const number = Math.min(1,2);
// 随机数（0-1）
const number = Math.random();
```