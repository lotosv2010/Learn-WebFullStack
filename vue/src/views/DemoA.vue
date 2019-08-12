<template>
  <div>
    <h1>我是Demo A</h1>
    <form-data ref="form" :getData="getData" :type="type"></form-data>
    <div><input type="button" value="展示" @click="show"></div>
  </div>
</template>

<script>
import FormData from '@/components/common/FormData'
export default {
  name: 'DemoA',
  data() {
    return {
      value: null,
      type: 'DemoA'
    }
  },
  components: {
    FormData
  },
  mounted() {
    // this.show()
  },
  methods: {
    getData(val, type) {
      console.log(val, type)
    },
    show() {
      console.log(this.$refs)
      this.$refs.form.changeShow()
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
