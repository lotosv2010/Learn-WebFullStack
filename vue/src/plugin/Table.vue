<template>
  <table>
    <thead>
      <tr class="thTr" v-for="(tr,index) in rowNum" :key="index">
        <th v-for="(th,index) in thLabel[index]" :key="index">{{ th.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr,index) in datas" :key="index">
        <td v-for="(td,index) in labelProp" :key="index">{{ tr[td] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'v-table',
  props: {
    datas: {
      type: Array
    },
    thLabel: {
      type: Array
    }
  },
  computed: {
    rowNum() {
      return (this.thLabel && this.thLabel.length) || 0
    },
    labelProp() {
      let thLabel = this.thLabel || []
      let labelArr = []
      thLabel.forEach((row,i) => { // 循环行
        row.forEach((th, j) => { // 循环th
          Object.keys(th).forEach((key, index) => { // 循环th对象
            if(key === 'prop') {
              labelArr.push(th[key])
            }
          })
        })
      })
      return labelArr
    }
  },
  mounted() {
    this.$nextTick(() => {
      let thLabel = this.thLabel || []
      let thTr = document.querySelectorAll('.thTr')
      thLabel.forEach((row,i) => { // 循环行
        row.forEach((th, j) => { // 循环th
          Object.keys(th).forEach((key, index) => { // 循环th对象
            key === 'rowspan' && thTr[i].childNodes[j].setAttribute('rowspan', th[key])
            key === 'colspan' && thTr[i].childNodes[j].setAttribute('colspan', th[key])
          })
        })
      })
    })
  }
};
</script>

<style lang="scss" scoped>
table {
  border: 1px solid #EBEEF5;
  height: 200px;
  width: 300px;
  text-align: center;
  margin-left: 40px;
  td {
    border: 1px solid #EBEEF5;
    position: relative;
    color: #606266;
  }
  th {
    text-align: center;
    border: 1px solid #EBEEF5;
    background-color: #F5F7Fa;
    color: #909D8F;
    line-height: 60px;
  }
}
</style>