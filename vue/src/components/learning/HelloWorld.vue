<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-change-color>this is Home Page</p>
    <div><input v-focus type="text"></div>
    <div v-font="{name: 'DIV',text: 'div'}"></div>
    <div v-test:params.text="textMsg"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      textMsg: 'test'
    }
  },
  directives: {
    changeColor: {
      bind(el, binding) {
        // console.log('bind function', el, binding);
        el.style.color = 'red'
      }
    },
    focus: {
      inserted(el) {
        el.focus()
      }
    },
    font(el, binding){
      // console.log(binding)
      el.innerHTML = `${JSON.stringify(binding)}`
    },
    test: {
      bind(el, binding, vnode) {
        el.innerHTML = `${JSON.stringify(binding)}`
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
