<template>
  <div v-show="isShow">
    <h1>相亲简历</h1>
    <p>姓名：<input v-model="name" type="text" name="name" ></p>
    <p>年龄：<input v-model="age" type="text" name="age" ></p>
    <p><input type="button" value="submit" @click="submit"></p>
  </div>
</template>

<script>
export default {
  name: 'FormData',
  props: ['getData', 'type'],
  data() {
    return {
      isShow: false,
      name: null,
      age: null
    }
  },
  methods: {
    submit() {
      const obj = {
        name: this.name,
        age: this.age
      }
      // console.log(obj)
      this.getData(obj, this.type)
    },
    changeShow() {
      this.isShow = !this.isShow
    }
  }
};
</script>

<style scoped>
</style>
