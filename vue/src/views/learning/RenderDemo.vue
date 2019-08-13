<template>
  <div>
    <div>
      <input type="button" value="success" @click="change('success', '成功')">
      <input type="button" value="warning" @click="change('warning', '警告')">
      <input type="button" value="error" @click="change('error', '错误')">
      <input type="button" value="info" @click="change('info', '信息')">
    </div>
    <box :type="type" :text="text"></box>
  </div>
</template>

<script>
import Box from '@/render/Box.vue'
export default {
  name: 'RanderDemo',
  components: {
    Box
  },
  data() {
    return {
      type: '',
      text: ''
    }
  },
  methods: {
    change(type, text) {
      this.type = type
      this.text = text
    }
  }
}
</script>

<style lang="scss" scoped>
</style>