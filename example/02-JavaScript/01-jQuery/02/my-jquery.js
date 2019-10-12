(function(root){
  var jQuery = function() {
    return new jQuery.prototype.init()
  }

  // jQuery.prototype.init = function() {}
  jQuery.fn = jQuery.prototype = {
    init: function() {

    },
    css: function() {

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
    }
  })

  root.$ = root.jQuery = jQuery
})(this)