<template>
  <el-container>
    <el-form ref="login" :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.code" placeholder="验证码">
          <template slot="append">
            <p class="code" @click.self="createCode">{{ form.verificationCode }}</p>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="记住我">
        <el-radio-group v-model="form.isRemberMe">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: '',
        code: '',
        verificationCode: 'SDFG',
        isRemberMe: false
      }
    }
  },
  mounted() {
    this.createCode()
  },
  methods: {
    login() {
      console.log(this.form)
      this.validateCode()
    },
    createCode() {
      //验证码的长度
      const length = 4
      let code = ''
      //所有候选组成验证码的字符，当然也可以用中文的
      const codeChars = new Array(3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y')
      // 循环组成验证码的字符串
      for (let index = 0; index < length; index++) {
        //获取随机验证码下标
        const charNum = Math.floor(Math.random() * 53);
        //组合成指定字符验证码
        code += codeChars[charNum]
      }
      this.form.verificationCode = code
    },
    validateCode() {
      if (this.form.code.length <= 0) {
        this.message('warning', '请输入验证码')
      } else if (this.form.verificationCode.toUpperCase() != this.form.code.toUpperCase()) {
        this.message('error', '验证码输入有误')
        this.createCode();
      } else {
        this.message('success', '验证码正确')
      }   
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: calc(100vh);
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    background-color: lavender;
    padding: 20px 40px 0px 0;
    .code {
      width: 30px;
      height: 100%;
    }
  }
}
</style>