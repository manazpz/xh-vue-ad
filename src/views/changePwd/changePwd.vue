<template>
  <div class="app-container">

    <el-form class="app-container" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">


      <el-form-item prop="oldPwd">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="oldPwd" type="password" v-model="loginForm.oldPwd" autoComplete="on" placeholder="旧密码"/>
      </el-form-item>

      <el-form-item prop="newPwd">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="newPwd" type="password" v-model="loginForm.newPwd" autoComplete="on" placeholder="新密码"/>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="listLoading" @click.native.prevent="confirmEdit">提交</el-button>


    </el-form>

  </div>
</template>

<script>
  import { updatePwd } from '@/api/user'

  export default {
    name: 'password',
    data() {
      return {
        list: null,
        listLoading: false,
        loginForm: {
          oldPwd: '',
          newPwd: ''
        },
        loginRules: { }
      }
    },
    created() {
    },
    methods: {
      confirmEdit() {
        updatePwd(this.loginForm).then(response => {
          this.list = response.data.items
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
