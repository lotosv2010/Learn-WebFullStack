<template>
  <div class="main">
    <h1>我是组件A</h1>
    <div><input type="text" v-model="value" placeholder="我是组件A"></div>
  </div>
</template>

<script>
export default {
  name: 'A',
  data() {
    return {
      value: null
    }
  },
  activated () {
    console.log('activated', '我进入了A组件')
  },
  deactivated() {
    console.log('deactivated', '我离开了A组件')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: aquamarine;
}
</style>
