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
  _.unique = function(arr, callbacks) {
    var ret = [];
    var target, i = 0;
    for(; i< arr.length; i++) {
      target = callbacks ? callbacks(arr[i]) : arr[i];
      if(ret.indexOf(target) === -1) {
        ret.push(target)
      }
    }
    return ret;
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

  _.mixin(_);

  root._ = _;
})(this)