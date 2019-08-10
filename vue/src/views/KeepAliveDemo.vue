<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <div><input type="button" value="切换" @click="isShow=!isShow"></div>
    <keep-alive>
      <keep-a v-if="isShow"></keep-a>
      <keep-b v-else></keep-b>
    </keep-alive>
  </div>
</template>

<script>
import KeepA from '@/components/A';
import KeepB from '@/components/B';
export default {
  name: 'KeepAliveDemo',
  components: {
    KeepA,
    KeepB
  },
  data() {
    return {
      msg: '大家晚上好',
      isShow: true
    }
  }
};
</script>

<style scoped>
</style>
