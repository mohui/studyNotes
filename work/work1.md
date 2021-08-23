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