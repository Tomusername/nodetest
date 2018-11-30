//创建模块 module.js
function hello() {
    var name;
    exports.setName = function (thyName) {
        name = thyName
    }
    exports.sayHello = function () {
        console.log('hello' + ' ' + name)
    }
}
//module.exports = Hello