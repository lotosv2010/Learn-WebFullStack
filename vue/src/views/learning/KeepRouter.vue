<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <div>
      <router-link to="/kr/a">Keep A</router-link> ||
      <router-link to="/kr/b">Keep B</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import KeepA from '@/components/A';
// import KeepB from '@/components/B';
export default {
  name: 'KeepAliveDemo',
  components: {
    // KeepA,
    // KeepB
  },
  data() {
    return {
      msg: '测试路由缓存',
      isShow: true
    }
  },
  created () {
    // 创建一个cache对象，缓存的容器
    // this.cache = Object.create(null)
  },
  destroyed() {
    // 销毁
    // for (const key in this.cache) {
    //   pruneCacheEntry(this.cache[key])
    // }
  },
};
</script>

<style scoped>
</style>
