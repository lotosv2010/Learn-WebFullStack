<!--
<template>
  <div>
    <div v-if="type==='success'" class="btn success">成功</div>
    <div v-else-if="type==='success'" class="btn warning">警告</div>
    <div v-else-if="type==='success'" class="btn error">错误</div>
    <div v-else-if="type==='success'" class="btn info">错误</div>
  </div>
</template>
-->

<script>
export default {
  name: 'Box',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    text: {
      type: String,
      default: 'success'
    }
  },
  render(h) {
    return h('div', {
      // 与v-bind:class一样
      class: {
        btn: true,
        success: this.type === 'success',
        warning: this.type === 'warning',
        error: this.type === 'error',
        info: this.type === 'info'
      },
      // DOM属性
      domProps: {
        innerText: this.text 
      },
      on: {
        click: this.click
      }
    })
  },
  methods: {
    click() {
      console.log(this.text)
    }
  },
};
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  border-radius: 4px;
  padding: 20px;
  margin: 5px 0;
  height: 114px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  // width: 20%;
}
.success {
  background-color:#67C23A;
}
.warning {
  background-color:#E6A23C;
}
.error {
  background-color:#F56C6C;
}
.info {
  background-color:#909399;
}
</style>