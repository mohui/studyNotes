
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