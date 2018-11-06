<template>
  <div class="app-container">
    <div style="width: 100%">
      <p style="color: red;font-size: 20px;text-align:center">商家注册</p>
    </div>
    <div style="width: 50%;margin-left: 25%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="申请人">
          <el-input v-model="form.user.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.user.phone"></el-input>
          <span style="color: red">联系方式将作为登录账号,请妥善填写！！！</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="form.user.password" autoComplete="on"
                    :placeholder="$t('login.password')" />
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.user.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.user.weiXin"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.user.idCard"></el-input>
        </el-form-item>
        <el-form-item label="店铺">
          <el-input v-model="form.shop.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="form.shop.address"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入简介"
            v-model="form.shop.blurb">
          </el-input>
        </el-form-item>
        <el-form-item label="营业执照号">
          <el-input v-model="form.paper.paperNo"></el-input>
        </el-form-item>
        <el-form-item label="执照所在地">
          <el-input v-model="form.paper.paperAddress"></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-date-picker
            v-model="form.shop.foundingTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执照有效期">
          <el-date-picker
            v-model="form.paper.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开户名">
          <el-input v-model="form.bank.accountName"></el-input>
        </el-form-item>
        <el-form-item label="开户账号">
          <el-input v-model="form.bank.accountNo"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="form.bank.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行地址">
          <el-input v-model="form.bank.bankAddress"></el-input>
        </el-form-item>
        <el-form-item label="店铺LOGO">
          <el-upload
            action="https://www.baidu.com/"
            list-type="picture-card"
            :file-list="form.shopImgs"
            accept="image/jpeg,image/gif,image/png"
            :on-change="handerShopChange"
            :on-remove="handerShopRemove"
            :limit="1"
            :auto-upload="false">
            <el-tooltip class="item" effect="light" content="仅上传一张，已有请先删除" placement="bottom" >
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证件">
          <el-upload
            multiple
            action="https://www.baidu.com/"
            list-type="picture-card"
            :file-list="form.userSps"
            accept="image/jpeg,image/gif,image/png"
            :on-change="handerSpsChange"
            :on-remove="handerSpsRemove"
            :limit="2"
            :auto-upload="false">
            <el-tooltip class="item" effect="light" content="仅上传两张，已有请先删除" placement="bottom" >
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-upload
            multiple
            action="https://www.baidu.com/"
            list-type="picture-card"
            :file-list="form.paperImgs"
            :on-change="handerPaperChange"
            :on-remove="handerPaperRemove"
            accept="image/jpeg,image/gif,image/png"
            :auto-upload="false">
            <el-tooltip class="item" effect="light" content="请上传jpg/png格式,不大于2M的图片" placement="bottom" >
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">申请</el-button>
          <el-button @click="onCancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { shopInsert } from '@/api/shop/shop'
  import store from '@/store'
  export default {
    data() {
      return {
        passwordType: 'password',
        form: {
          shop: {},
          bank: {},
          paper: {},
          user: {},
          shopImgs: [],
          paperImgs: [],
          userSps: []
        }
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
      handerShopChange(file, fileList) {
        this.form.shopImgs = fileList
      },
      handerShopRemove(file, fileList) {
        this.form.shopImgs = fileList
      },
      handerSpsChange(file, fileList) {
        this.form.userSps = fileList
      },
      handerSpsRemove(file, fileList) {
        this.form.userSps = fileList
      },
      handerPaperChange(file, fileList) {
        this.form.paperImgs = fileList
      },
      handerPaperRemove(file, fileList) {
        this.form.paperImgs = fileList
      },
      onSubmit() {
        shopInsert(this.form).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.insertData()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '申请成功，等待审核',
              type: 'success'
            })
            this.$router.push({ path: '/' })
          }
        }).catch(() => {
        })
      },
      onCancel() {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>
<style>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>
