<template>
  <div style="padding: 20px !important;">
    <!-- <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
            <div class="div-demo">{{ this.list }}</div>
            <el-button type="primary" v-display-key="`a`">我是A用户的权限</el-button>
            <el-button type="primary" v-display-key="`b`">我是B用户的权限</el-button>
            <el-button type="primary" v-display-key="`c`">我是C用户的权限</el-button>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container> -->
    <g-alert
      title="成功提示的文案"
      type="info"
      description="辅助性文字1"
      :show-icon="true"
      effect="dark"
    />
    <g-alert
      title="成功提示的文案"
      type="success"
      description="辅助性文字1"
      :show-icon="true"
      effect="dark"
    />
    <g-alert
      title="成功提示的文案"
      type="error"
      description="辅助性文字1"
      :show-icon="true"
      effect="dark"
    />
    <g-alert
      title="成功提示的文案"
      type="warning"
      description="辅助性文字1"
      :show-icon="true"
      effect="dark"
    />
  </div>
</template>

<script>
import { getList } from '@/api/netease/list.js'
export default {
  name: 'Index',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const res = await getList()
        if(res.code === 200) {
          this.list = res.data
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>

<style scoped lang="scss">
// 局部引入
// @import '@/assets/style/index.scss';
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  .div-demo {
    @include fontColor;
  }
}
.el-alert {
  margin-bottom: 20px;
}
</style>
