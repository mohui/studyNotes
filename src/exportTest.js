// ----------示例1----------
// ----------示例2----------

// let name;
// exports.setName = function(thyName) {
//     name = thyName;
// };
// exports.sayHello = function() {
//     console.log('Hello ' + name);
// };

// ----------示例3----------
function Hello() {
    let name;
    this.setName = function(thyName) {
        name = thyName;
    };
    this.sayHello = function() {
        console.log('Hello ' + name);
    };
}
module.exports = Hello;
// exports.Hello = Hello; // 这个不行
