import Vue from 'vue';
import Skeleton from './skeleton/Skeleton.vue';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});