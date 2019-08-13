<template>
  <div>
    <h1>Install</h1>
  </div>
</template>

<script>
import FormData from '@/components/learning/common/FormData'
export default {
  name: 'Install',
  install(Vue, option) {
    // 1 添加全局一个属性
    Vue.$name = 'Robin'
    // 2 添加全局的组件选项
    Vue.mixin({
      methods: {
        mixinFn() {
          console.log('this is mixin function')
        }
      },
    })
    // 3 directive
    Vue.directive('focus', {
      bind(el) {
        el.focus()
      }
    })
    // 4 prototype
    Vue.prototype.$age = 18
    Vue.prototype.$myMethods = val => {
      console.log('myMethods', val)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
