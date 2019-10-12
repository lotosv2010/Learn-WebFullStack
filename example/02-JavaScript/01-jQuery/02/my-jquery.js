(function(root){

  var testExp = /^\s*(<[\w\W]+>)[^>]*$/;
	var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  var version = '1.0.1'
  var jQuery = function(selector, context) {
    return new jQuery.prototype.init(selector, context)
  }

  // jQuery.prototype.init = function() {}
  jQuery.fn = jQuery.prototype = {
    length: 0,
		jquery: version,
		selector: "",
		init: function(selector, context) {
			context = context || document;
			var match, elem, index = 0;
			//$()  $(undefined)  $(null) $(false)  
			if (!selector) {
				return this;
			}

			if (typeof selector === "string") {
				if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
					match = [selector]
				}
				//创建DOM
				if (match) {
					//this  
					jQuery.merge(this, jQuery.parseHTML(selector, context)); 
                //查询DOM节点
				} else {
					elem = document.querySelectorAll(selector);
					var elems = Array.prototype.slice.call(elem);
					this.length = elems.length;
					for (; index < elems.length; index++) {
						this[index] = elems[index];
					}
					this.context = context;
					this.selector = selector;
				}
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}
		},
    css: function() {
      console.log('this is css function')
    }
  }

  // extend
  jQuery.fn.extend = jQuery.extend = function() {
    var target = arguments[0] || {}
    var length = arguments.length
    var i = 1
    var option, name, copy, src, copyIsArray, clone
    var deep = false

    if(typeof target === 'boolean') {
      deep = target
      target = arguments[1]
      i = 2
    }
    if(typeof target !== 'object') {
      target = {}
    }

    // 参数的个数是 1
    if(length === i) {
      target = this
      i-- // i===0
    }

    // 浅拷贝
    for (; i < length; i++) {
      if((option = arguments[i]) !=null) {
        for (name in option) {
          if (option.hasOwnProperty(name)) {
            copy = option[name]
            src= target[name]
            if(deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if(copyIsArray) {
                copyIsArray = false
                clone = src && jQuery.isArray(src) ? scr : []
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {}
              }
              target[name] = jQuery.extend(deep, clone, copy)
            } else if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
    }

    return target
  }

  // 共享原型对象
  jQuery.fn.init.prototype = jQuery.fn

  jQuery.extend({
    // 类型检测
    isPlainObject: function(obj) {
      return toString.call(obj) === '[object Object]'
    },
    isArray: function(obj) {
      return Array.isArray(obj)
    },
    isFunction: function(fn) {
      return toString.call(fn) === '[object Function]'
    },
    markArray: function(arr, results) {
      var ret = results || []
      if(arr != null) {
        jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
      }
      return ret
    },
    // 合并数组
    merge: function(first, second) {
			var l = second.length,
				i = first.length,
				j = 0;

			if (typeof l === "number") {
				for (; j < l; j++) {
					first[i++] = second[j];
				}
			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}

			first.length = i;

			return first;
		},
		parseHTML: function(data, context) {
			if (!data || typeof data !== "string") {
				return null;
			}
			//过滤掉<a>   <a>   => a 
			var parse = rejectExp.exec(data);
			console.log(parse)
			return [context.createElement(parse[1])];   
		}
  })

  root.$ = root.jQuery = jQuery
})(this)