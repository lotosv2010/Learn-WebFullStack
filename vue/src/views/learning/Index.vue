<template>
  <div>
    <div id="nav">
      <router-link to="/learning/demoHome">Home</router-link> |
      <router-link to="/learning/about">About</router-link> |
      <router-link to="/learning/keep">Keep Alive</router-link> |
      <router-link to="/learning/kr">Keep Router</router-link> |
      <router-link to="/learning/da">Demo A</router-link> |
      <router-link to="/learning/db">Demo B</router-link> |
      <router-link to="/learning/extends">extends</router-link> |
      <router-link to="/learning/plugin">plugin</router-link> |
      <router-link to="/learning/render">render</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>