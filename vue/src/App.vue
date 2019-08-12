<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/keep">Keep Alive</router-link> |
      <router-link to="/kr">Keep Router</router-link> |
      <router-link to="/da">Demo A</router-link> |
      <router-link to="/db">Demo B</router-link> |
      <router-link to="/extends">extends</router-link> |
      <router-link to="/plugin">plugin</router-link> |
      <router-link to="/render">render</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
