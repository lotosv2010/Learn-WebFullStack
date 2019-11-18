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

  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key)
  }


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

  _.mixin(_);

  root._ = _;
})(this)