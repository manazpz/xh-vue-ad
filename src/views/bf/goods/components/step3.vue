<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">发布完成!</h1>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
          <li class="link-type">
            <router-link to="/bf/gm/warehouseGoodsList">进入商品仓库</router-link>
          </li>
          <li><a @click.prevent="refresh" href="#">发布新商品</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import errGif from '@/assets/401_images/401.gif'

  export default {
    name: 'page401',
    inject: ['reload'],
    data() {
      return {
        errGif: errGif + '?' + +new Date()
      }
    },
    methods: {
      refresh() {
        this.reload()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
  li {
    padding-bottom: 5px;
  }
  a {
    color: #008489;
    text-decoration: none;
  &:hover {
     text-decoration: underline;
   }
  }
  }
  }
</style>
