define(function(require, exports, module) {
    var b = require('b')
    console.log('a', b)
    // 接口
    exports.hello = function() {
        console.log('a.js.hello()', 'hello work')
    }
});