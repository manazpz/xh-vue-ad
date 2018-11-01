<template>
  <div class="app-container">
    <el-form ref="form" :model="form" >

      <el-form-item>
        <el-row>
          <el-col style="font-size: 20px">店铺信息</el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="border:0.5px solid #CCCCCC">
        <el-row>
          <el-col><div style="background: #CCCCCC;min-height: 36px;padding-left: 10px;color: #fff">基本信息</div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">店铺名称</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.shop.name"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">店铺地址</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.shop.address"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">比例</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.shop.ratio" placeholder="请输入比列：10=10%"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">联系方式</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-input v-model="form.user.phone"></el-input>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">QQ</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-input v-model="form.user.qq"></el-input>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">微信</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-input v-model="form.user.weiXin"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px;height: 64px">店铺简介</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入简介"
              v-model="form.shop.blurb">
            </el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px;height: 158px">店铺LOGO</div></el-col>
          <el-col :span="20" ><div style="padding: 5px">
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
          </div></el-col>
        </el-row>
      </el-form-item>

      <el-form-item style="border:0.5px solid #CCCCCC">
        <el-row>
          <el-col><div style="background: #CCCCCC;min-height: 36px;padding-left: 10px;color: #fff">营业执照</div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">店主</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-select v-model="form.user.id" filterable :filter-method="userSearch" placeholder="请选择">
              <el-option
                v-for="item in userOptions"
                :key="item.id"
                :label="item.nickName"
                :value="item.id">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">真实姓名</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-input v-model="form.user.name"></el-input>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">身份证号</div></el-col>
          <el-col :span="4" align="center"><div style="padding: 5px">
            <el-input v-model="form.user.idCard"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">营业执照号</div></el-col>
          <el-col :span="8" align="center"><div style="padding: 5px">
            <el-input v-model="form.paper.paperNo"></el-input>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">执照所在地</div></el-col>
          <el-col :span="8" align="center"><div style="padding: 5px">
            <el-input v-model="form.paper.paperAddress"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">成立时间</div></el-col>
          <el-col :span="8"><div style="padding: 5px">
            <el-date-picker
              v-model="form.shop.foundingTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div></el-col>
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">执照有效期</div></el-col>
          <el-col :span="8"><div style="padding: 5px">
            <el-date-picker
              v-model="form.paper.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px;height: 158px">店主身份证照片</div></el-col>
          <el-col :span="20" ><div style="padding: 5px">
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
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px;height: 158px">执照照片</div></el-col>
          <el-col :span="20"><div style="padding: 5px">
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
          </div></el-col>
        </el-row>
      </el-form-item>

      <el-form-item style="border:0.5px solid #CCCCCC">
        <el-row>
          <el-col><div style="background: #CCCCCC;min-height: 36px;padding-left: 10px;color: #fff">银行信息</div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">开户名</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.bank.accountName"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">开户账号</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.bank.accountNo"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">开户银行名</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.bank.bankName"></el-input>
          </div></el-col>
        </el-row>
        <el-row style="border-bottom:1px solid #CCCCCC">
          <el-col :span="4" align="center"><div style="background: #F7F7F7;padding: 5px">开户银行地址</div></el-col>
          <el-col :span="20" align="center"><div style="padding: 5px">
            <el-input v-model="form.bank.bankAddress"></el-input>
          </div></el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button style="float: right" type="primary" @click="saveData">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { userList } from '@/api/user'
  import { shopInsert, shopDetail, shopUpdate } from '@/api/shop'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'shopEdit',
    directives: {
      waves
    },
    data() {
      return {
        shopId: this.$route.query.shopId,
        userOptions: [],
        userQuery: {
          pageSize: 10
        },
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
    watch: {
      $route(to, from) {
        if (to.path === '/shop/shopEdit') {
          if (this.shopId) {
            this.getDeatil()
          } else {
            this.form = {
              shop: {},
              bank: {},
              paper: {},
              user: {},
              shopImgs: [],
              paperImgs: [],
              userSps: []
            }
          }
        }
      }
    },
    created() {
      this.getUsers()
      if (this.shopId) {
        this.getDeatil()
      }
    },
    methods: {
      getUsers() {
        userList(this.userQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getUsers()
            })
          }
          if (response.code === 200) {
            this.userOptions = response.data.items
          }
        }).catch(() => {
        })
      },
      getDeatil() {
        shopDetail({ shopId: this.shopId }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getDeatil()
            })
          }
          if (response.code === 200) {
            this.form = response.data
            if (this.form.paper) {
              if (this.form.paper.startTime !== '' && this.form.paper.startTime !== null && this.form.paper.startTime !== undefined &&
                this.form.paper.endTime !== '' && this.form.paper.endTime !== null && this.form.paper.endTime !== undefined) {
                this.form.paper.time = [new Date(this.form.paper.startTime), new Date(this.form.paper.endTime)]
              }
            }
          }
        }).catch(() => {
        })
      },
      userSearch(val) {
        this.userQuery.nickName = val
        this.getUsers()
      },
      saveData() {
        if (this.shopId) {
          this.updateData()
        } else {
          this.insertData()
        }
      },
      insertData() {
        shopInsert(this.form).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.insertData()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push({ path: 'reviewShop' })
          }
        }).catch(() => {
        })
      },
      updateData() {
        shopUpdate(this.form).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.updateData()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push({ path: 'shopList' })
          }
        }).catch(() => {
        })
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
      handerShopChange(file, fileList) {
        this.form.shopImgs = fileList
      },
      handerShopRemove(file, fileList) {
        this.form.shopImgs = fileList
      }
    }
  }
</script>

