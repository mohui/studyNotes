###  node 学习
### 康宁瑞通软件工程师笔试题
>作答语言不限但请勿使用伪代码或者自然语言作答，答题空白不够可索要新的纸张.**请务必保证字迹清晰，可辨识度高**

1. 现有一整数数组(int List[100])，数组中的数字是乱序的，例如:
```javascript
List[0] = 23, List[1]= 1,List[2] = 58;
```
请编写程序,按顺序输出数组中最小的三个数.**注意**:不能使用排序算法对整个数组做排序处理，然后再获取三个数.只能采用时间复杂度最低的方法

2. 给定任意正整数N.请编程输出不大于N的所有质数(素数)

3. 现有一个集合类型(如ava中的Collection接口,或者其他语言中的数组/集合,C语言自定义的结构体，
另有三个函数filter map reduce ,其分别实现了如下功能，请为这个集合类型实现对应的成员函数.
```javascript
a =[1, 2, 3, 4, 5, 6, 7, 8, 9]; // a是一个包含9个元素的数组
// 筛选/过滤
b = a.filter( it => it>5);  // b=[6，7，8，9]
// 映射
c=a.map(it=>it+1);  // c=[2,3,4,5，6，7，8,9,10]
//归并
d = a.reduce( (pre,next) => pre + next, 0) //d = 45
/**
    其中it => it > 5对应各个语言中的lambda表达式/匿名函数/接口(Java) /函数指针(C语言)，这里只是写成lambda的形式而已.
*/
```
**附加要求,尽可能满足**(如果满足，请将前面的圆圈勾上，方便面试官阅卷)

+ filter,map,reduce必须支持链式调用，例如:找到偶数,并且除以2,然后累加. (C工程师无需实现)
```javascript
e= a.filter (it=>it%2==0) .map(it=>it/2) .reduce((p,n)=>p+n,0) //e=10
```
+ Java/Kotlin/C#/OC/Swift/C++等强类型语言请实现泛型1 template. (C工程师无需实现)
+ **实现各个函数的多线程版本，JavaScript工程请实现并行的async版本(匿名函数也可能异步)**.(PHP工程师无需实现)

    3.1 请实现filter函数

    3.2 请实现map函数

    3.3 请实现reduce函数
### 第一
```javascript
/**
 * 
 */
let list = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let a = list[0];
let b = list[1];
let c = list[2];
let index = -1;

for (let i = 0; i < list.length; i++) {
    if (a >= list[i]) {
        a = list[i];
        index = i;
    }
}
list[index] = undefined;
for (let i = 0; i < list.length; i++) {
    if (b >= list[i] && b > a) {
        b = list[i];
        index = i;
    }
}
list[index] = undefined;
for (let i = 0; i < list.length; i++) {
    if (c >= list[i] && c > b) c = list[i];
}

console.log(a);
console.log(b);
console.log(c)
```
### 第二
```javascript
// 大于1的自然数中，除了1和其本身，不能被其他自然数整除 2，3，5，7，11

let num = 100;
let result = [];

for (let i = 2; i <= num; i++) {
    if (isCheck(i)) result.push(i);
}

function isCheck(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log(result);
```

### 第三
```javascript
// filter实现
Array.prototype.filter1 = function (func) {
    let result = [];
    for (let item of this) {
        if (func(item)) result.push(item);
    }
    return result;
}

// map实现
Array.prototype.map1 = function (func) {
    let result = [];
    for (let item of this) {
        result.push(func(item));
    }
    return result;
}

// reduce实现
Array.prototype.reduce1 = function (func, init) {
    let result = this[0];
    let index = 1;
    if (init !== undefined) {
        result = init;
        index = 0;
    }

    for (index; index < this.length; index++) {
        result = func(result, this[index]);
    }
    return result;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let b = arr.filter1(async (it) => it > 5);
console.log(b);

let c = arr.map(it => it + 1);
console.log(c);

let d = arr.reduce1((pre, next) => pre + next, 0);
console.log(d);

let e = arr.filter(it => it % 2 == 0).map(it => it / 2).reduce((p, n) => p + n, 0)
console.log(e);
```