<template>
  <el-container class="login">
    <el-header>
      <img src="../../assets/logo@2x.png" alt="" class="logo">
      <div class="title">登录</div>
      <div class="links">
        <el-link type="primary">网易云首页</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary">帮助与文档</el-link>
      </div>
    </el-header>
    <el-main>
      <div class="img">
        <img src="../../assets/login-left.png" alt="">
      </div>
      <el-form ref="login" :model="form" label-width="100px">
        <el-form-item>
          <h2 class="title">网易云登录</h2>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name" v-focus placeholder="用户名"></el-input>
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
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { login } from '@/api/netease/login.js'
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
  directives: {
    focus: {
      inserted(el) {
        const input = el.querySelector('input')
        input.focus()
      },
      update(el) {
        const input = el.querySelector('input')
        const spanDom = el.querySelector('span')
        const val = input.value
        const span = document.createElement('span')
        span.innerText = '用户名为六位'
        // span.style = 'color:red;'
        span.style.color = 'red'
        input.style.borderColor = val.length > 6 ? 'red' : '#DCDFE6'
        val.length > 6 ? (!spanDom && el.appendChild(span)) : (spanDom && el.removeChild(spanDom))
      }
    },
  },
  mounted() {
    this.createCode()
  },
  methods: {
    login() {
      this.validateCode()
      login(this.form,(response) => {
        console.log(response)
      })
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
.login {
  background: url("../../assets/bg.png") no-repeat;
  background-size: cover;
  height: calc(100vh);
  width: 100%;
  .el-header{
    height: 70px !important;
    padding: 0 85px;
    background: #fff;
    img {
      float: left;
      max-width: 300px;
      height: 30px;
      padding-top: 15px;
      padding-bottom: 25px;
      cursor: pointer;
    }
    .title {
      float: left;
      margin-top: 19px;
      margin-left: 10px;
      font-size: 20px;
    }
    .links {
      float: right;
      height: 70px;
      display: flex;
      align-items: center;
    }
  }
  .el-main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .el-form {
      background-color: #ffffff;
      // width: 405px;
      // height: 476px;
      padding: 40px 40px 20px 0;
      .title {
        margin-left: -80px;
        font-size: 20px;
      }
      .code {
        width: 30px;
        height: 100%;
      }
      .el-button {
        width: 140%;
        margin-left: -80px;
      }
    }
    .img {
      img {
        width: 440px;
        height: 300px;
      }
    }
  }
}
</style>
