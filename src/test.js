// ----------示例1----------

// const myModule = require('./exportTest');
// myModule.setName('魔辉');
// myModule.sayHello();

// ----------示例2----------

// const hello1 = require('./exportTest');
// hello1.setName('魔辉');
// const hello2 = require('./exportTest');
// hello2.setName('神辉');
//
// hello1.sayHello();


const Hello = require('./exportTest');

const hello = new Hello();
hello.setName('魔辉');
hello.sayHello();
