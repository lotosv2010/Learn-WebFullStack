<template>
  <div>
    <h1>Plugin</h1>
    <div><input v-model="value" type="text" placeholder="请输入值"></div>
    <div><input type="button" value="submit" @click="submit"></div>
    <message ref="msg"></message>
    <br><br>
    <v-table :datas="datas" :thLabel="thLabel"></v-table>
  </div>
</template>

<script>

export default {
  name: 'Plugin',
  data() {
    return {
      value: null,
      datas: [
        { a: '1', b: '2', c: '3', d: '4'},
        { a: '5', b: '6', c: '7', d: '8'}
      ],
      thLabel: [
        [
          { prop: 'a', label: 'th[1][1]',rowspan: 2},
          { label: 'th[1][2]', colspan: 2},
          { label: 'th[1][3]'}
        ],
        [
          { prop: 'c', label: 'th[2][1]'},
          { prop: 'b', label: 'th[2][2]'},
          { prop: 'd', label: 'th[2][3]'}
        ]
      ]
    }
  },
  components: {

  },
  methods: {
    submit() {
      if(!this.value) {
        // alert('请输入值')
        this.$nextTick(() => {
          this.$refs.msg.msgPlugin('请输入值', 5000)
        })
        return
      }
      console.log(this.value)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
