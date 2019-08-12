(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
})(this, function() {
    // ASSET_TYPES有两重功效，不加s是为了方便复用：
    // 1.Vue.options.components
    // 2.Vue.component
    var ASSET_TYPES = [
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

     /* baseOptions */
    // 编译器中默认的配置项
    var baseOptions = {
        expectHTML: {}, // true,
        modules: {}, // modules$1,
        directives: {}, // directives$1,
        isPreTag: {}, // isPreTag,
        isUnaryTag: {}, // isUnaryTag,
        mustUseProp: {}, // mustUseProp,
        canBeLeftOpenTag: {}, // canBeLeftOpenTag,
        isReservedTag: {}, // isReservedTag,
        getTagNamespace: {}, // getTagNamespace,
        staticKeys: {} // genStaticKeys(modules$1)
    };

    // Browser environment sniffing
    var inBrowser = typeof window !== 'undefined';

    // check whether current browser encodes a char inside attribute values
    var div;
    function getShouldDecode (href) {
        div = div || document.createElement('div');
        div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
        return div.innerHTML.indexOf('&#10;') > 0
    }

    // #3663: IE encodes newlines inside attribute values while other browsers don't
    var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
    // #6828: chrome encodes content in a[href]
    var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

    // Vue 的全局的配置对象
    var config = {
        optionMergeStrategies: Object.create(null)
    }

    // 为什么要做下面这句的操作？
    // 原因：处理自定义策略
    var strats = config.optionMergeStrategies;

    // "所有"选项的默认策略
    var defaultStrat = function (parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal
    };

    /**
   * Other object hashes.
   */
    strats.props =
    strats.methods =
    strats.inject =
    strats.computed = function (
        parentVal,
        childVal,
        vm,
        key
    ) {
        if (childVal && "development" !== 'production') {
            assertObjectType(key, childVal, vm);
        }
        if (!parentVal) { return childVal }
        var ret = Object.create(null);
        extend(ret, parentVal);
        if (childVal) { extend(ret, childVal); }
        return ret
    };

    // 自定义策略处理
    strats.data = function(parentVal, childVal, vm) {
        // 组件的基本原理
        // 聚焦到vm，如何判断是根实例还是组件
        if(!vm) {
            // this指向组件
            if(childVal && typeof childVal !== 'function') {
                warn('data must be a function')
            }
            // 处理子组件data的选项
            return mergeDataOrFn(parentVal, childVal)
        }
        // 处理根组件data的选项
        return mergeDataOrFn(parentVal, childVal, vm)
    }

    // toRawType
    var _toString = Object.prototype.toString;
    function toRawType (value) {
        return _toString.call(value).slice(8, -1)
    }
    
    // isPlainObject
    function isPlainObject (obj) {
        return _toString.call(obj) === '[object Object]'
    }

    // warn
    function baseWarn (msg, range) {
        console.error((`[Vue compiler]: ${msg}`));
    }
    function baseLog(msg, range) {
        console.log(`${range}: `, msg)
    }
    this.warn = baseWarn;
    this.log = baseLog;

    // hasOwn
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    /**
   * Query an element selector if it's not an element already.
   */
    function query (el) {
        if (typeof el === 'string') {
            var selected = document.querySelector(el);
            if (!selected) {
                warn('Cannot find element: ' + el);
                return document.createElement('div')
            }
            return selected
        } else {
            return el
        }
    }

    /**
     * Get outerHTML of elements, taking care
     * of SVG elements in IE as well.
     */
    function getOuterHTML (el) {
        if (el.outerHTML) {
            return el.outerHTML
        } else {
            var container = document.createElement('div');
            container.appendChild(el.cloneNode(true));
            return container.innerHTML
        }
    }

    /**
     * Mix properties into target object.
     */
    function extend (to, _from) {
        for (var key in _from) {
            to[key] = _from[key];
        }
        return to
    }

    /**
   * Check if a string starts with $ or _
   */
    function isReserved (str) {
        // 获取Unicode编码
        var c = (str + '').charCodeAt(0);
        return c === 0x24 || c === 0x5F
    }

    // assertObjectType
    function assertObjectType (name, value, vm) {
        if (!isPlainObject(value)) {
            warn("Invalid value for option \"" + name + "\": expected an Object, " +"but got " + (toRawType(value)) + ".", vm);
        }
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached (fn) {
        var cache = Object.create(null);
        return (function cachedFn (str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str))
        })
    }

    /**
     * Camelize a hyphen-delimited string.
     */
    var camelizeRE = /-(\w)/g;
    var camelize = cached(function (str) {
        return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
    });

    /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
    function noop (a, b, c) {}

    /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
    function normalizeProps (options, vm) {
        var props = options.props;
        if (!props) { return }
        var res = {};
        var i, val, name;
        if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
            name = camelize(val);
            res[name] = { type: null };
            } else {
            warn('props must be strings when using array syntax.');
            }
        }
        } else if (isPlainObject(props)) {
        for (var key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val)
            ? val
            : { type: val };
        }
        } else {
        warn(
            "Invalid value for option \"props\": expected an Array or an Object, " +
            "but got " + (toRawType(props)) + ".",
            vm
        );
        }
        options.props = res;
    }

    // mergeDataOrFn
    function mergeDataOrFn(parentVal, childVal, vm) {
        if(!vm) {
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

    
    // mergeOptions
    function mergeOptions(parent, child, vm) {
        /**选项规范的检测：
         * Components
         * Props
         * Inject
         * Directives
         * 此处简略，不去实现
         */
        normalizeProps(child, vm);


        var options = {};
        var key;
        for (key in parent) {
            mergeField(key)
        }
        for (key in child) {
            if(!hasOwn(parent, key)) {
                mergeField(key)
            }
        }

        // 选项的策略处理 ，例如: el data 生命周期的钩子函数
        // 1.自定义策略,(strats对象,挂载点)
        // 2.默认策略
        function mergeField(key) {
            var strat = strats[key] || defaultStrat
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options;
    }

    // callHook
    function callHook(vm, hook) {
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    handlers[i].call(vm)
                } catch (error) {
                    warn(error)
                }
            }
        }
    }

    // 描述对象
    var sharedPropertyDefinition = {
        enumerable: true, // 可枚举
        configurable: true, // 可配置
        get: noop,
        set: noop
    };

    // proxy
    // target === vm, sourceKey === '_data', key === key: 属性名称
    function proxy (target, sourceKey, key) {
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

    // observe
    function observe(value, asRootData) {
        // TODO
    }

    // mountComponent 挂载组件
    function mountComponent (vm, el, hydrating) {
        // vm._render()：作用 会去调用vm.$options.render,返回生成的虚拟节点VNode
        // vm._update()：作用 把vm.vm._render()生成的虚拟节点VNode，渲染成真正的DOM
        // new Watcher(updateComponent)：渲染函数的观察者，updateComponent，vm.$options.render触发get的拦截器，重新的渲染
        return vm
    }

    // initData
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
                    warn(("Method \"" + key + "\" has already been defined as a data property."),vm);
                }
            }
            if (props && hasOwn(props, key)) {
                warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.",vm);
            } else if (!isReserved(key)) { // 过滤掉_或$ 开头的属性就不去做代理，为了避免和vue自身属性的冲突
                // 数据代理
                proxy(vm, "_data", key);
            }
        }
        // observe data 开启响应式
        observe(data, true /* asRootData */);
    }

    // getData
    function getData (data, vm) {
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

    // initState
    function initState(vm) {
        var opts = vm.$options;
        if (opts.data) {
            initData(vm)
        } else {
            observe(vm.data = {}, true)
        }
    }


    // initMixin
    function initMixin(Vue) {
        Vue.prototype._init = function(options) {
            // log(this, `[initMixin][_init]`)
            var vm = this;
            // 选项合并
            // log(Vue.options, `[initMixin][_init]`)
            vm.$options = mergeOptions(Vue.options, options || {}, vm);
            callHook(vm, 'beforeCreate')
            callHook(vm, 'beforeCreated')
            initState(vm); // 数据的初始化操作

            if (vm.$options.el) {
                vm.$mount(vm.$options.el)
            }
        }
    }

    
    // initGlobalAPI
    function initGlobalAPI(Vue) {
        var configDef = {}
        configDef.get = function() {
            return config;
        }
        configDef.set = function() {
            warn('Do not replace the Vue.config object, set individual fields instead.')
        }
        // 监听对Vue.config的访问
        Object.defineProperty(Vue, 'config', configDef)
    }

    // initExtend
    function initExtend(Vue) {
        // 用于原型继承，缓存构造函数
        Vue.cid = 0;
        var cid = 1
        Vue.extend = function(extendOptions) {
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
            var Sub = function VueComponent (options) {
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

    // Vue
    var Vue = function(options) {
        if(!(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword');
        }
        // log(this, `[vue]`)
        this._init(options);
    }

    Vue.options = Object.create(null); // Vue.options = {}

    ASSET_TYPES.forEach(function(type) {
        Vue.options[`${type}s`] = Object.create(null);
    })

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

    LIFECYCLE_HOOKS.forEach(function(hook) {
        strats[hook] = mergeHook;
    })

    function createFunction (code, errors) {
        try {
            return new Function(code) // 渲染函数的长相
        } catch (err) {
            errors.push({ err: err, code: code });
            return noop
        }
    }

    function createCompileToFunctionFn (compile) {
        var cache = Object.create(null);
        return function compileToFunctions(template, options, vm) {
            // console.log(template);
            options = extend({}, options)
            {
                // detect possible CSP restriction
                try {
                    new Function('return 1');
                } catch (e) {
                    if (e.toString().match(/unsafe-eval|CSP/)) {
                        warn(
                        'It seems you are using the standalone build of Vue.js in an ' +
                        'environment with Content Security Policy that prohibits unsafe-eval. ' +
                        'The template compiler cannot work in this environment. Consider ' +
                        'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                        'templates into render functions.'
                        );
                    }
                }
            }

            // check cache
            // 缓存的优化
            var key = options.delimiters ? String(options.delimiters) + template : template;
            if (cache[key]) {
                return cache[key]
            }
            var compiled = compile(template, options) // AST render staticRenderFns
            var res= {}
            var fnGenErrors = [] // 编译错误信息
            res.render = createFunction(compiled.render, fnGenErrors)
            return (cache[key] = res)
        }
    }

    // createCompilerCreator 编译器的构造者
    function createCompilerCreator(baseCompile) {
        return function  createCompiler(baseOptions) {
            // 编译的核心方法
            function compile(template, options) {
                // console.log('createCompilerCreator.createCompiler.compile', template)
                var finalOptions = Object.create(baseOptions); // {}.__proto__ -> baseOptions：编译器内置的配置项
                var errors = []; // 编译错误信息
                var tips = []; // 编译提示信息
                var warn = function (msg, range, tip) {
                    (tip ? tips : errors).push(msg);
                };

                // 1.自定义编译器的选型
                // 2.内置的编译器选选项
                if (options) {
                    // 合并finalOptions
                }

                var compiled = baseCompile(template, finalOptions)
                compiled.errors = errors;
                compiled.tips = tips;
                return compiled
            }
            return {
                compile: compile,
                compileToFunctions: createCompileToFunctionFn(compile)
            }
        }
    }

    /**
     * Convert HTML string to AST.
     */
    function parse (template, options) {}

    // `createCompilerCreator` allows creating compilers that use alternative
    // parser/optimizer/codegen, e.g the SSR optimizing compiler.
    // Here we just export a default compiler using the default parts.
    var createCompiler = createCompilerCreator(function baseCompile ( template, options) {
        // 模板编译成AST => 词法分析  句法分析  代码生成 (token)
        // var ast = parse(template.trim(), options); // parseHTML
        // if (options.optimize !== false) {
        //     optimize(ast, options);
        // }
        // var code = generate(ast, options); // web所需要的代码

        return {
            ast: {},// ast,
            render: `console.log('hello compile')`,// code.render, // 渲染函数所需要的字符串，生成渲染函数
            staticRenderFns: 'staticRenderFns' // code.staticRenderFns
        }
    });

    /* */
    var ref$1 = createCompiler(baseOptions);
    var compile = ref$1.compile;
    var compileToFunctions = ref$1.compileToFunctions;
    
    // public mount method
    // runtime function 运行时版本,构建时完成
    Vue.prototype.$mount = function(el, hydrating) {
        // 渲染函数，组件挂载
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el, hydrating)
    }

    // 清缓存
    var mount = Vue.prototype.$mount;

    // 重构
    // 完整版本  运行时 + compiler = 完整版本
    Vue.prototype.$mount = function(el, hydrating) {
        // 内置一个编译器
        el = el && query(el);

        /* istanbul ignore if */
        if (el === document.body || el === document.documentElement) {
            warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
            return this
        }

        var options = this.$options;
        // resolve template/el and convert to render function
        if (!options.render) {
            var template = options.template;
            if (template) {
                if (typeof template === 'string') {
                    if (template.charAt(0) === '#') {
                        template = idToTemplate(template);
                        /* istanbul ignore if */
                        if (!template) {
                            warn(("Template element not found or is empty: " + (options.template)),his);
                        }
                    }
                } else if (template.nodeType) {
                    template = template.innerHTML;
                } else {
                    {
                        warn('invalid template option:' + template, this);
                    }
                    return this
                }
            } else if (el) {
                template = getOuterHTML(el);
            }

            if (template) {
                // istanbul ignore if 
                // 编译器性能统计
                // if (config.performance && mark) {
                //     mark('compile');
                // }

                // template 模板 => render function => AST
                // {}:开发者拥有定制编译器的能力
                var ref = compileToFunctions(template, { 
                    outputSourceRange: "development" !== 'production',
                    shouldDecodeNewlines: shouldDecodeNewlines,
                    shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                    delimiters: options.delimiters, // 改变文本插入符
                    comments: options.comments // 保留渲染模板中的注释
                }, this);
                var render = ref.render;
                var staticRenderFns = ref.staticRenderFns;
                options.render = render;
                options.staticRenderFns = staticRenderFns;

                console.log(ref.render())
                // istanbul ignore if
                // if (config.performance && mark) {
                //     mark('compile end');
                //     measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
                // }
            }
        }
        // log(template, 'mount')
        return mount.call(this, el, hydrating)
    }

    initMixin(Vue);
    initGlobalAPI(Vue);
    initExtend(Vue);
    return Vue;
})