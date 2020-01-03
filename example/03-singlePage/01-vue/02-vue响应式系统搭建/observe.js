/**
 * data: 数据对象
 * $watch: 方法
 */
var data = {
    root: 'max',
    age: 30,
    list: {
        a: 1,
        b: 2
    },
    arr: [3, 4, 5, 6]
}

// 数据观测 依赖收集
function observe(data) {
    for (const key in data) {
        let deps = [] // 依赖收集，存储的地方
        let val = data[key]

        // 深度监听，变量提升会导致出问题,通过let解决
        if(Object.prototype.toString.call(val) === '[object Object]') {
            observe(val)
        }

        Object.defineProperty(data, key, {
            get: function () {
                // console.log(target)
                deps.push(target)
                return val
            },
            set: function(newValue) {
                if (newValue === val) return
                val = newValue
                // console.log(deps)
                deps.forEach(function(func) {
                    func(val)
                })
            }
        })
    }
}

observe(data)

var target = null

// 依赖收集
function $watch(str, fn) {
    target = fn
    var arr, obj = data;
    if (typeof str === 'function') {
        str();
        return;
    }

    if(/\./.test(str)) {
        arr = str.split('.')
        arr.forEach(function(key) {
            // 1: data.list = { a: 1, b: 2}
            // 2: list.a = 1
            obj = obj[key]
        })
        return
    }
    data[str]
}

// 依赖
$watch('root', function(val) {
    console.log('root change', val);
})

data.root = 'remi'
console.log(data.root);

// $watch('list.a', function(val) {
//     console.log('list.a change', val);
// })

// data.list.a = 10
// console.log(data.list.a);


// 触发更新
// 函数  render 渲染函数
function render() {
    with(data) { // data.root  data.age  触发get钩子函数
        console.log(data)
        console.log(`姓名：${root},年龄：${age}`) // 问题： 1.重复的依赖收集, 2.数组做处理
    }
}

$watch(render,render)
data.age = 31