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

```javascript
// $ npm install --save decimal.js // 安装 decimal
import { Decimal } from 'decimal.js';//刚刚加入时IDEA可能还没反应所以显示灰色，过会就好了

//加法运算
var a = 0.13;
var b = 0.25;
console.log('加法运算 a + b =', a + b);
console.log('使用Decimaljs a + b =', new Decimal(a).add(new Decimal(b)).toNumber());
 
//减法
var a = 1.0;
var b = 0.99
console.log('直接减法运算 a - b =', a - b);
console.log('使用Decimaljs a - b =', new Decimal(a).sub(new Decimal(b)).toNumber().toFixed(2);//保留两位数据
 
//乘法
var a = 1.01;
var b = 1.02;
console.log('直接乘法运算 a * b =', a * b);
console.log('使用Decimaljs a * b =', new Decimal(a).mul(new Decimal(b)).toNumber());
 
//除法
var a = 0.033;
var b = 10;
console.log('直接除法运算 a / b =', a / b);
console.log('使用Decimaljs a / b =', new Decimal(a).div(new Decimal(b)).toNumber());

```

#### i++ 和 ++i 的区别
```javascript
export default class Test {
    test() {
        // 先运算 m = i + 5,再加1 i = i + 1;
        let i = 5;
        const m = i++ + 5;
        console.log(m); // 10
        console.log(i); // 6

        // 先加1 i = i + 1 ,在运算 m = i + 5
        i = 5;
        const n = ++i + 5;
        console.log(n); // 11
        console.log(i); // 6
    }
}
```