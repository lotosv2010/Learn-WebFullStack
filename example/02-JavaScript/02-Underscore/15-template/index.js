(function(root) {
  var push = Array.prototype.push;

  var _  = function(obj) {
    if(obj instanceof _) {
      return obj;
    }
    if(!(this instanceof _)) {
      return new _(obj);
    }
    this._wrapped = obj;
  };

  //数组去重
  _.unique = function(array, isSorted, iteratee, context) {
    // 没有传入 isSorted 参数
    if(!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }

    // 如果有迭代函数
    if(iteratee != null) {
      iteratee = cb(iteratee, context);
    }

    var result = [];

    // 用来过滤重复值
    var seen;
    for(var i = 0; i< array.length; i++) {
      var computed = iteratee ? iteratee(array[i], i, array) : array[i]
      
      // 如果是有序数组,则当前元素只需跟上一个元素对比即可
      // 用 seen 变量保存上一个元素
      if(isSorted) {
        if(!i || seen !== computed) result.push(computed);
        // seen 保存当前元素,供下一次对比
        seen = computed;
      } else if(result.indexOf(computed) === -1) {
        result.push(computed)
      }
    }
    return result;
  }

  // 开启链接式调用
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  }

  // 辅助函数
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }

  _.prototype.value = function() {
    return this._wrapped;
  }

  _.funsctions = function(obj) {
    var result = [];
    var key;
    for(key in obj) {
      result.push(key)
    }
    return result;
  }

  // optimizeCb优化迭代器
  var optimizeCb = function(func, context, count) {
    if(context === void 0) {
      return func;
    }
    switch (count == null ? 3 : count) {
      case 1:
          return function(value) {
            return func.call(context, value)
          }
        break;
      case 3:
          return function(value, index, obj) {
            return func.call(context, value, index, obj)
          }
        break;
      case 4:
          return function(memo, value, index, obj) {
            return func.call(context, memo, value, index, obj)
          }
        break;
    }
  }

  var cb = function(iteratee, context, count) {
    if(iteratee == null ) {
      return _.identity;
    }
    if(_.isFunction(iteratee)) {
      return optimizeCb(iteratee, context, count);
    }
  }

  _.map = function(obj, iteratee, context) {
    // 生成不同功能迭代器
    var iteratee = cb(iteratee, context);
    //分辨 obj是数组对象, 还是object对象
    var keys = !_.isArray(obj) && Object.keys(obj);
    var length = (keys || obj).length;
    var result = Array(length);
    for(var index = 0;index < length;index++) {
      var currentKey = keys ? keys[index] : index;
      result[index] = iteratee(obj[currentKey], index, obj)
    }
    return result;
  };

  // 默认迭代器
  _.identity = function(value) {
    return value;
  }

  _.restArguments = function(func) {
    // rest参数位置
    var startIndex = func.length - 1;
    return function() {
      var length = arguments.length - startIndex,
          rest = Array(length),
          index = 0;
      // rest 数组中的成员
      for(; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      // 非rest参数成员的值一一对应
      var args = Array(startIndex + 1);
      for(index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    }
  }

  var Ctor = function() {}

  // Object.create polyfill
  var baseCreate = function(prototype) {
    if(!_.isObject(prototype)) return {};
    if(Object.create) return Object.create(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  var createReduce = function(dir) {
    // 累加
    var reduce = function(obj, iteratee, memo, init) {
      var keys = !_.isArray(obj) && Object.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if(!init) {
        memo = obj[keys ? keys[index] : index];
        index += dir; // 1
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        // memo => 0
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }
    // memo 最终能累加的结果，每一次累加的过程
    return function(obj, iteratee, memo, context) {
      var init = arguments.length >= 3;
      return reduce(obj, optimizeCb(iteratee, context, 4), memo, init)
    }
  }

  _.reduce = createReduce(1); // 1 | -1

  //predicate  真值检测(重点: 返回值)
  _.filter = _.select = function(obj, predicate,context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if(predicate(value, index, list)) results.push(value);
    })
    return results
  }

  // (dir === 1 => 从前往后找)  (dir === -1 => 从后往前找)
  function createPredicateIndexFinder(dir){
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array.length;
      // 根据 dir 变量来确定数组遍历的起始位置
      var index = dir > 0 ? 0 : length - 1;
      for(; idnex >= 0 && index < length; index += dir) {
        // 找到第一个符合条件的元素
        // 并返回下标值
        if(predicate(array[index], index, array))
          return index;
      }
      return -1;
    }
  }

  _.findIndex = createPredicateIndexFinder(1);
	_.findLastIndex = createPredicateIndexFinder(-1);

  _.sortedIndex = function(array, obj, iteratee, context) {
    // 重点：cb函数 if(iteratee == null) { return function(value) { return value; }}
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0,
        high = array.length;
    // 二分查找
    while(low < high) {
      var mid = Math.floor((low + high) / 2);
      if(iteratee(array[mid]) < value) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return low;
  }

  function createIndexFinder(dir, predicateFind, sortedIndex) {
    // API调用
    // -.indexOf(array, value, [isSorted])
    return function(array, item, idx) {
      var i = 0,
          length = array.length;
      // 第三个参数true用二分查找优化，否则，遍历查找
      if(sortedIndex && _.isBoolean(idx) && length) {
        // 能用二分查找加速条件
        // 用_.sortIndex找到有序数组中item正好插入的位置
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }

      // 特殊情况，如果要查找的元素是NaN类型，NaN!==NaN
      if(item !== item) {
        idx = predicateFind(slice.call(array, 1, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }

      // 非上述情况正常遍历
      for(idx = dir > 0 ? i : length - 1; idx >=0 && idx < length; idx += dir) {
        if(array[idx] === item) return idx; 
      }

      return -1;
    }
  }

  // _.findIndex 特殊情况下的处理方案
  // _.sortedIndex 针对排序的数组做二分查找，优化性能
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf= createIndexFinder(-1, _.findLastIndex);

  //摊平数组
  var flatten = function(array, shallow) {
    var ret = [];
    var index = 0;
    for(var i = 0; i < array.length; i++) {
      var value = array[i]; //展开一次
      if(_.isArray(value) || _.isArguments(value)) {
        // 递归全部展开
        if(!shallow) {
          value = flatten(value, shallow);
        }
        var j = 0;
        var len = value.length;
        while(j < len) {
          ret[index++] = value[j++];
        }
      } else {
        ret[index++] = value
      }
    }
    return ret;
  }

  _.flatten = function(array, shallow) {
    // js提供的原生array方法flat，等同underscore中的flatten
    // return array.flat(shallow ? 1 : Infinity);
    return flatten(array, shallow);
  }

  // 返回数组中除了最后一个元素外的其他全部元素。 在arguments对象上特别有用
  _.initial = function (array, n, guard) {
    return [].slice.call(array, 0, Math.max(0, array.length - (n == null ? 1 : n)))
  }

  // 返回数组中除第一个外的其他全部元素，传递n参数将返回从n开始的剩余所有元素
  _.rest = function(array, n, guard) {
    return [].slice.call(array, n == null ? 1 : n);
  }

  // 返回一个 [min, max] 范围内的任意整数
  _.random = function(min, max) {
    if(max == null) {
      max = min;
      min = 0;
    }
    // Math.floor()向下取整
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  }

  _.deepClone = function(obj) {
    if(_.isArray(obj)) {
      return _.map(obj, function(item) {
        return _.isArray(item) || _.isObject(item) ? _.deepClone(item) : item;
      })
    } else if(_.isObject(obj)) {
      // memo = iteratee(memo, obj[currentKey], currentKey, obj);
      // return func.call(context, memo, value, index, obj)
      return _.reduce(obj, function(memo, value, key){
        // console.log(memo, value, key)
        memo[key] = _.isArray(value) || _.isObject(value) ? _.deepClone(value) : value;
        return memo
      }, {})
  

    } else {
      return obj
    }
  }

  // 返回乱序之后的数组副本
  _.shuffle = function(array) {
    return _.sample(array, Infinity);
  }

  // 洗牌算法
  _.sample = function(array, n) {
    if(n == null) {
      return array[_.random(array.length - 1)]
    }
    var sample = _.clone(array);
    var length = sample.length;
    var last = length - 1;
    n = Math.max(Math.min(n, length), 0);
    for(var index = 0; index < n; index++) {
      // 随机数 index n
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand]; // 交换
      sample[rand] = temp; // 交换
    }
    return sample.slice(0, n);
  }

  //去掉数组中所有的假值   _.identity = function(value){return value};
	_.compact = function(array) {
    return _.filter(array, _.identity)
  }

  // 返回某一个范围内的数值组成的数组
  _.range = function(start, stop, step) {
    if(stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    // 返回数组的长度  返回大于等于参数x的最小整数 向上取整
    var length = Math.max(Math.ceil((stop - start) / step), 0);

    // 返回的数组
    var range = Array(length);
    for(var index = 0; index < length; index++, start += step) {
      range[index] = start;
    }
    return range;
  }

  // 返回一个函数的副本
  _.partial = function(func) {
    // 提取参数
    var args = [].slice.call(arguments, 1);
    var bound = function() {
      var index = 0;
      var length = args.length;
      var ret = Array(length);
      for(var i = 0; i < length; i++) {
        ret[i] = args[i]
      }
      while(index < arguments.length) {
        ret.push(arguments[index++]);
      }
      return func.apply(this, ret);
    }
    return bound;
  }

  
  /**
   * //存储中间运算结果,提高效率
	 * 参数 hasher是个function通过返回值来记录key
	 * _.memoize(function, [hashFunction])
	 * 适用于需要大量重复求值的场景
	 * 比如递归求解斐波那契数
   * **/
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      console.log(key)
      // 储存变量,方便使用
      var cache = memoize.cache;

      // 求 key
			// 如果传入了 hasher,则用 hasher 函数来记录 key
      // 否则用参数 key(即memoize 方法传入的第一个参数)当key
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);

      // 如果这个 key 还没被求过值 先记录在缓存中.
      if(!_.has(cache, address)) {
        cache[address] = func.apply(this, arguments);
      }
      return cache[address];
    }
    // cache 对象被当做 key-value 键值对缓存中间运算结果
    memoize.cache = {};
    return memoize;
  }
  
  // 延迟执行函数
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    return setTimeout(function() {
      // 上下文为null，默认绑定window
      return func.apply(null, args)
    }, wait)
  }

  // 函数组合(管道)
  // reduce 方式
  // _.compose = function() {
  //   var len = arguments.length;
  //   var funcs = [].slice.call(arguments, 0, len - 1);
  //   var data = [].slice.call(arguments, len - 1);
  //   return funcs.reduce(function(memo, func) {
  //     console.log(memo)
  //     return func(memo);
  //   }, ...data)
  // }

  // underscore 方式
  _.compose = function() {
    // 处理函数  数据
    var args = arguments;
    //  倒序调用
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[i].apply(this, arguments); // args[i] === C  arguments === 2
      while(i--) result = args[i].call(this, result) // 输出 === 返回值   输入 === 参数
      return result
    }
  }

  // each
  _.each = function(target, callbacks) {
    var key, i = 0;
    if(_.isArray(target)) {
      var length = target.length;
      for(; i < length; i++) {
        callbacks.call(target, target[i], i);
      }
    } else {
      for(key in target) {
        callbacks.call(target, key, target[key])
      }
    }
  }

  // 类型检测
  _.isArray = function(array) {
    return toString.call(array) === '[object Array]';
  }

  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // mixin
  _.mixin = function(obj) {
    _.each(_.funsctions(obj), function(name) {
      var func = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(this, args))
      }
    })
  }

  // 属性检测
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key)
  }

  // 获取object上所有属性的名称
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };


  // createAssigner
  var createAssigner = function(func, defaults) {
    return function(obj) {
      var length = arguments.length;
      if(defaults) obj = Object(obj)
      if(length < 2 || obj == null) return obj
      for(var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = func(source)
            l = keys.length;
        for (let i = 0; i < l; i++) {
          var key = keys[i]
          if(!defaults || obj[key] === void 0) obj[key] = source[key]
        }
      }
      return obj;
    }
  }

  _.extend = createAssigner(_.allKeys)
  _.extendOwn = createAssigner(_.keys)

  // 字符串逃逸
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  var unescapeMap = _.invert(escapeMap);

  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match]
    }

    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegExp = new RegExp(source);
    var replaceRegexp = new RegExp(source, 'g');

    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegExp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    }
  }

  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // 时间戳(单位：ms) / 1000(单位：m)
  _.now = Date.now;

  // 节流函数
  /**
   * func: 处理函数
   * wait: 指定毫秒
   * options: 配置(leading: flase, trailing: false)
   */
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    // 上一次在执行回调的时间戳，初始值
    var previous = 0;
    if(!options) options = {}

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if(!timeout) context = args = null; 
    }

    var throttled = function() {
      // 时间戳
      var now = _.now();
      // 不立即执行,根据wait调用回调函数
      if(!previous && options.leading === false) {
        previous = now;
      }
      // 距离下一次调用func还需要等待多长时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if(remaining <= 0 || remaining > wait) {
        if(timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if(!timeout) {
          context = args = null;
        }
      } else if(!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    }

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    }

    return throttled;
  }

  // 防抖
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = _.restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }

  // 白名单
  _.pick = function(obj, oiteratee, context) {
    var result = {}
    var iteratee, keys;
    if(obj == null) {
      return result
    }
    if(_.isFunction(oiteratee)) {
      keys = _.allKeys(obj)
      // 生成迭代器 iteratee 封装
      iteratee = optimizeCb(oiteratee, context)
    } else {
      keys = [].slice.call(arguments, 1);
      iteratee = function(value, key, obj) {
        return hasOwnProperty.call(obj, key);
        // return key in obj;
      }
    }
    for(var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      // 满足条件
      if(iteratee(value, key, obj)) {
        result[key] = value;
      }
    }
    return result
  }

  // 模板引擎
  var templateSetting = {
    // js逻辑捕获
    evalute: /<%([\s\S]+?)%>/g,
    // js变量捕获
    interpolate: /<%=([\s\S]+?)%>/g,
    // js逃逸字符的捕获
    escape: /<%-([\s\S]+?)%>/g
  }

  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  _.template = function(templateString, settings) {
    settings = _.extend({}, templateSetting, settings)

    var matcher = new RegExp([
      settings.interpolate.source,
      settings.escape.source,
      settings.evalute.source
    ].join('|'), 'g')

    var index = 0;
    var source = "__p+='";
    // 解析模板
    templateString.replace(matcher, function(match, interpolate, escape, evalute, offset) {
      // console.log(match, interpolate, escape, evalute, offset)
      source += templateString.slice(index, offset).replace(escapeExp, escapeChar)
      index = offset + match.length;
      // console.log(match, match.length, index)
      if(escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if(interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        // console.log(source)
      } else if(evalute) {
        source += "';\n" + evaluate + "\n__p+='";
      }
    })
    // console.log(matcher)
    source += "';\n";

    source = 'with(obj||{}){\n' + source + '}\n';
    // console.log(source) 
    source = "var __t,__p='';\n" +
      source + 'return __p;\n';

    console.log(source)
    // 渲染函数
    var render = new Function('obj', source)
    var template = function(data) {
      return render.call(null, data)
    }
    return template
  }

  _.mixin(_);

  root._ = _;
})(this)