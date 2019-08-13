export default {
  created() {
    console.log('mixins', 'created')
  },
  data() {
    return {
      value: 'this is mxins value',
      text: 'this is mxins text'
    }
  },
  methods: {
    getData() {
      console.log('hook,value is', this.value)
    }
  }
}
