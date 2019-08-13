<template>
  <div>
    <h1>组件的继承</h1>
    <h2>{{ value }}</h2>
    <h2>{{ text }}</h2>
    <div><input type="button" value="getData" @click="getData"></div>
  </div>
</template>

<script>
import mixin from '@/mixins'
const extend = {
  created() {
    console.log('extend', 'created')
  },
  data() {
    return {
      value: 'this is extend value',
      text: 'this is extend text'
    }
  },
  methods: {
    getData() {
      console.log('hook,value is', this.value)
    }
  }
}
export default {
  name: 'Extends',
  // mixins类似于面向切面的编程(AOP)
  // extends类型于面向对象的编程
  extends: extend, // 继承
  mixins: [mixin], // 混入
  data() {
    return {
      text: 'this is hook text' // 前面的值会被此处的值覆盖
    }
  },
  created() {
    console.log('hook', 'created');
  },
  methods: {
    getData() {
      console.log('hook,value is', this.value)
    }
  }
};
</script>

<style scoped>
</style>
