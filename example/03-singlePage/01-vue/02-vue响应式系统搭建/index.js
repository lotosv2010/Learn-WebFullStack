(function (global, factory) {
  // commonjs
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    // requirejs
    typeof define === 'function' && define.amd ? define(factory) :
      // global === window
      (global = global || self, global.Vue = factory());
})(this, function () {

  ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  function noop (a, b, c) {}

  // 描述对象
  var sharedPropertyDefinition = {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get: noop,
    set: noop
  };

  // Vue 的全局的配置对象
  var config = {
    // 自定义策略处理
    optionMergeStrategies: Object.create(null)
  }

  // warn
  var warn = function (msg) {
    console.error(`[Vue warn]: ${msg}`)
  }

  // hasOwn
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  // toRawType
  var _toString = Object.prototype.toString;

  // isPlainObject
  function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
  }

  // Check if a string starts with $ or _
  function isReserved(str) {
    // 获取Unicode编码
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  // 为什么要做下面这句的操作？
  // 原因：处理自定义策略
  var strats = config.optionMergeStrategies;

  // "所有"选项的默认策略
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  }

  strats.data = function (parentVal, childVal, vm) {
    // 组件的基本原理
    // 聚焦到vm，如何判断是根实例还是组件
    if (!vm) {
      // this指向组件
      if (childVal && typeof childVal !== 'function') {
        warn('data must be a function')
      }
      // 处理子组件data的选项
      return mergeDataOrFn(parentVal, childVal)
    }
    // 处理根组件data的选项
    return mergeDataOrFn(parentVal, childVal, vm)
  }

  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      /**
       * 1.子组件中的parentVal, childVal都应该是函数
       * 
       * 会遇到的情况：
       * 1.parentVal === undefined return childVal
       * 2.childVal === undefined return parentVal
       * 3.parentVal === function() {}  childVal === function() {} mergeData 将两者返回值对象合并成一个
       *  */
    } else {
      return function mergerdInstanceDataFn() {
        return typeof childVal === 'function' ?
          childVal.call(vm, vm) :
          childVal;
      }
    }
  }

  // 所有的钩子函数的自定义策略
  // parentVal == undefined
  // childVal = function() {}
  function mergeHook(parentVal, childVal) {
    return childVal ?
      parentVal ?
        parentVal.concat(childVal) :
        Array.isArray(childVal) ?
          childVal : [childVal] :
      parentVal
  }

  // callHook
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
        try {
          handlers[i].call(vm)
        } catch (error) {
          warn(error)
        }
      }
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  })

  function mergeOptions(
    parent,
    child,
    vm
  ) {
    /**选项规范的检测：
     * Components
     * Props
     * Inject
     * Directives
     * 此处简略，不去实现
     */
    // console.log(parent, child)
    var options = {};
    var key;

    for (key in parent) {
      // console.log(key)
      mergeField(key)
    }

    for (key in child) {
      if (!hasOwn(key)) {
        // console.log(key)
        mergeField(key)
      }
    }

    // 选项的策略处理 ，例如: el data 生命周期的钩子函数
    // 1.自定义策略,(strats对象,挂载点)
    // 2.默认策略
    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    // console.log(options)
    return options;
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // 选项合并
      vm.$options = mergeOptions(Vue.options, options || {}, vm);

      // 初始化钩子函数
      callHook(vm, 'beforeCreate');
      callHook(vm, 'created');
      initState(vm); // 数据的初始化操作
    }
  }

  function initGlobalAPI(Vue) {
    var configDef = {}
    configDef.get = function () {
      return config;
    }
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    }
    // 监听对Vue.config的访问
    Object.defineProperty(Vue, 'config', configDef);
  }

  // initExtend
  function initExtend(Vue) {
    // 用于原型继承，缓存构造函数
    Vue.cid = 0;
    var cid = 1
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;  // Super === Vue
      var SuperId = Super.cid;
      // 缓存检测 cachedCtors
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      // 缓存处理 cachedCtors[0] = 子类的引用
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;
      if (name) {
        // validateComponentName(name); // 组件名称规范检查
      }

      // 子类，构造函数
      var Sub = function VueComponent(options) {
        this._init(options);
      };
      // {}.__proto__ = Super.prototype = Vue.prototype
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      // 组件在初始化 mergeOptions 选项的合并 => 规范的检查 => 策略的处理
      Sub.options = mergeOptions(
        Super.options,  // Vue.options
        extendOptions // 组件的选项对象
      );
      Sub['super'] = Super;
      // create asset registers, so extended classes
      // can have their private assets too.
      // Super == Vue,Vue.component 注册全局组件
      // Vue.options.components 内置的抽象组件
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      cachedCtors[SuperId] = Sub;
      return Sub
    }
  }

  function getData(data, vm) {
    // pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      // popTarget();
    }
  }

  // observe
  function observe(value, asRootData) {
    // TODO
  }

  // proxy
  // target === vm, sourceKey === '_data', key === key: 属性名称
  function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      // this -> target -> vm
      // eg: vm._data.root
      return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }

  function initData(vm) {
    // 校验数据对象data是否是一个纯对象
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }

    // proxy data on instance
    var keys = Object.keys(data); // key 数据对象上的属性
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(("Method \"" + key + "\" has already been defined as a data property."), vm);
        }
      }
      if (props && hasOwn(props, key)) {
        warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
      } else if (!isReserved(key)) { // 过滤掉_或$ 开头的属性就不去做代理，为了避免和vue自身属性的冲突
        // 数据代理
        proxy(vm, "_data", key);
      }
    }
    // observe data 开启响应式
    observe(data, true /* asRootData */);
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true)
    }

  }

  /** ------------1 入口 ------------- */
  function Vue(options) {
    // new Vue() --> this === Vue
    // Vue() --> this === window
    if (!(this instanceof Vue)) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  Vue.options = Object.create(null);

  ASSET_TYPES.forEach(type => {
    Vue.options[`${type}s`] = Object.create(null)
  });

  /** ------------2 初始化属性 ------------- */
  initMixin(Vue)
  /** ------------3 初始化API ------------- */
  initGlobalAPI(Vue)
  initExtend(Vue)

  return Vue
})