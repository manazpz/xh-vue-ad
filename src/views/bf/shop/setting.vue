<template>
  <div class="app-container">
    <el-form ref="form" :model="info" label-width="100px">
      <el-form-item label="店铺编号：">
        <span>{{info.no}}</span>
      </el-form-item>
      <el-form-item label="店主：">
        <span>{{info.nickName}}</span>
      </el-form-item>
      <el-form-item label="店铺名称：">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input v-model="info.address"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="info.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介：">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入简介"
          v-model="info.blurb">
        </el-input>
      </el-form-item>
      <el-form-item label="店铺LOGO：">
        <el-upload
          action="https://www.baidu.com/"
          list-type="picture-card"
          :file-list="fileList"
          :on-change="handerChange"
          :on-remove="handerRemove"
          accept="image/jpeg,image/gif,image/png"
          :auto-upload="false">
          <el-tooltip class="item" effect="light" content="请上传jpg/png格式,不大于2M的图片" placement="bottom" >
            <i class="el-icon-plus"></i>
          </el-tooltip>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { shopInfo, updateShop } from '@/api/shop/shop'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'setting',
    directives: {
      waves
    },
    data() {
      return {
        info: {},
        fileList: []
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        shopInfo().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getInfo()
            })
          }
          if (response.code === 200) {
            this.info = response.data.items[0]
            this.fileList.push({ 'url': this.info.img })
          }
        }).catch(() => {
        })
      },
      handerChange(file, fileList) {
        this.fileList = []
        this.fileList.push(file)
      },
      handerRemove() {
        this.fileList = []
      },
      onSubmit() {
        this.info.path
        updateShop(this.info, this.fileList).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getInfo()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
