<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <lang-select class="international right-menu-item"></lang-select>

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span @click="info" style="display:block;">{{name}}</span>
          </el-dropdown-item>
          <router-link to="/">
            <el-dropdown-item divided>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <router-link to="/user/changePwd">
            <el-dropdown-item>
              {{$t('navbar.changePwd')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native = "imagecropperShow=true">
            {{$t('navbar.headImg')}}
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <image-cropper :width="300" :height="300" :url="url" @close='close' @crop-upload-success="cropSuccess" langType="en"
                   :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ImageCropper from '@/components/ImageCropper'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import LangSelect from '@/components/LangSelect'
  import ThemePicker from '@/components/ThemePicker'
  import { Message } from 'element-ui'

  export default {
    components: {
      ImageCropper,
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      LangSelect,
      ThemePicker
    },
    data() {
      return {
        url: process.env.BASE_API + '/sys/uploadHead',
        imagecropperShow: false,
        imagecropperKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      info() {
        Message({
          message: '此功能暂未开放',
          type: 'error',
          duration: 5 * 1000
        })
      },
      cropSuccess(resData) {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
        this.$store.dispatch('setAvatar', resData.headImg)
      },
      close() {
        this.imagecropperShow = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
  &:focus{
     outline: none;
   }
  .right-menu-item {
    display: inline-block;
    margin: 0 8px;
  }
  .screenfull {
    height: 20px;
  }
  .international{
    vertical-align: top;
  }
  .theme-switch {
    vertical-align: 15px;
  }
  .avatar-container {
    height: 50px;
    margin-right: 30px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
  }
  }
  }
  }
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
