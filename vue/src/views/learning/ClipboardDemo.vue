view/clipboard/index.vue
<template>
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="直接使用剪切板">
          <div class="el-tab-pane" >
            <el-input   v-model="inputData"    style='width:400px;'></el-input>
            <el-button    @click="handleCopy(inputData,$event)">复制</el-button>
          </div>
      </el-tab-pane>
        <el-tab-pane label="使用封装的剪切指令v-directive">
          <div class="el-tab-pane" >
            <el-input v-model="inputData" placeholder="Please input" style='width:400px;'></el-input>
            <el-button type="primary" icon="document" v-clipboard:copy='inputData' v-clipboard:success='clipboardSuccess'>copy</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>

// import Vue from 'vue'
// import gc from 'g-clipboard'
// Vue.use(gc)

export default {
  name: "ClipboardDemo",
  data(){
    return {
      inputData:""
    }
  },
  methods:{
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    async handleCopy(data, e) {
      const res = await this.$copyText(data, e)
      console.log(res)

      const res2 = this.$getVersion(data, e)
      console.log(res2)
    }
  }
}
</script>

<style scoped>

</style>