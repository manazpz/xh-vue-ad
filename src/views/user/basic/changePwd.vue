<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="parmasForm" :rules="rules" ref="parmasForm" label-position="left">

      <div class="title-container">
        <h3 class="title">{{$t('user.changePwd')}}</h3>
      </div>

      <el-form-item prop="oldPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="oldPwd" :type="passwordType" v-model="parmasForm.oldPwd" autoComplete="on"
                  :placeholder="$t('user.oldPwd')" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="newPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="newPwd" :type="passwordType" @keyup.enter.native="handleLogin" v-model="parmasForm.newPwd" autoComplete="on"
                  :placeholder="$t('user.newPwd')" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handlePwd">{{$t('user.save')}}</el-button>


    </el-form>

  </div>
</template>

<script>
  export default {
    name: 'changePwd',
    data() {
      return {
        parmasForm: {
          oldPwd: '',
          newPwd: ''
        },
        rules: {
          oldPwd: [{ required: true, trigger: 'blur', message: '旧密码不为空！' }],
          newPwd: [{ required: true, trigger: 'blur', message: '新密码不为空！' }]
        },
        passwordType: 'password',
        loading: false
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handlePwd() {
        this.$refs.parmasForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('ChangPwd', this.parmasForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.loading = false
          }
        })
      }
    },
    created() {
    },
    destroyed() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  &:-webkit-autofill {
     -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
     -webkit-text-fill-color: #fff !important;
   }
  }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  span {
  &:first-of-type {
     margin-right: 16px;
   }
  }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  &_login {
     font-size: 20px;
   }
  }
  .title-container {
    position: relative;
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  }
</style>
