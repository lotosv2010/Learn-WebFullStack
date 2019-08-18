define([
    'b'
], function(b) {
    console.log('a', b)
    var hello = function() {
        console.log('a.js.hello()', 'hello work')
    }
    return {
        // 接口对象
        hello: hello
    }
});