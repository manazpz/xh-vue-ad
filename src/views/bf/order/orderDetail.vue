<template>
  <div class="app-container">
    <el-container style="border:1px solid #c0c0c0">
        <el-container style="border-right:1px solid #c0c0c0;width: 30%">
          <el-main style="border-bottom:1px solid #c0c0c0;padding: 0">
            <el-row style="background: #F3F3F3;padding: 10px">
              <el-col :span="24">订单信息</el-col>
            </el-row>
            <el-row style="padding: 20px 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货地址：{{data.address.areaString + data.address.streetString}}</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货人：{{data.address.name}}</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">联系方式：{{data.address.phone}}</el-col>
            </el-row>
            <div style="border:0.5px dashed #F3F3F3;margin: 0 10px 0 10px"></div>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">订单编号：{{data.number}}</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">下单时间：{{data.createTime}}</el-col>
            </el-row>
            <div style="border:0.5px dashed #F3F3F3;margin: 0 10px 0 10px"></div>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">商品总价：{{data.price}}</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">运费：0.0</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">优惠金额：0.0</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">订单总价：{{data.price}}</el-col>
            </el-row>
          </el-main>
          <el-footer style="padding: 0;height:auto">
            <el-row style="background: #F3F3F3;padding: 10px">
              <el-col :span="24">用户银行信息</el-col>
            </el-row>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">开户行名称：{{data.bank.bankName}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">开户行地址：{{data.bank.bankAddress}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">持卡人姓名：{{data.bank.accountName}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">开户行卡号：{{data.bank.accountNo}}</el-col>
            </el-row>
          </el-footer>
        </el-container>
        <el-container style="width: 70%">
          <el-main>
            <el-row style="background: #F3F3F3;padding: 10px">
              <el-col :span="24">收付款状态</el-col>
            </el-row>
            <el-row style="padding: 10px 0 0 20px;font-size: 10px">
              <el-col :span="24">1.收款人账号：{{data.invoice.account_no}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 0 20px;font-size: 10px">
              <el-col :span="24">2.发票抬头：{{data.invoice.title}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 0 20px;font-size: 10px">
              <el-col :span="24">3.发票内容：{{data.invoice.content}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 0 20px;font-size: 10px">
              <el-col :span="24">4.付款人：{{data.invoice.payment}}</el-col>
            </el-row>
            <el-row style="padding: 10px 0 0 20px;font-size: 10px">
              <el-col :span="24">5.付款人账号：{{data.invoice.paymentno}}</el-col>
            </el-row>
            <!--<el-row style="padding: 10px 0 10px 50px;font-size: 10px">-->
              <!--<el-col :span="24">订单操作原因：无</el-col>-->
            <!--</el-row>-->
          </el-main>
        </el-container>
    </el-container>

    <el-table :key='tableKey' :data="data.goods"  stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="商品名称" min-width="60">
        <template slot-scope="prop">
          <span>{{prop.row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="150">
        <template slot-scope="prop">
          <img v-if="prop.row.imgs[0] != null" :src=" prop.row.imgs[0].url " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格" min-width="120" :show-overflow-tooltip="true">
        <template slot-scope="prop">
          <span>{{prop.row.parameterStr}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="70" :show-overflow-tooltip="true">
        <template slot-scope="prop">
          <span>￥{{prop.row.guJia}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="70" :show-overflow-tooltip="true">
        <template slot-scope="prop">
          <span>x1</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="50" :show-overflow-tooltip="true">
        <template slot-scope="prop">
          <span>{{prop.row.checkStatus | jcStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="50" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" @click="logistics(scope.row.id)">新增物流信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="快递公司名称：" prop="title" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入物流公司名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="公司编码：" prop="duty" class="postInfo-container-item">
          <el-input v-model="temp.com_code" required placeholder="请输入公司编码"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="物流单号：" prop="duty" class="postInfo-container-item">
          <el-input v-model="temp.code" required placeholder="请输入物流单号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="createLogistisc">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { orderDetail, insertLogistics } from '@/api/order/order'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'orderDetail',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        data: {
          address: { areaString: '', streetString: '' }
        },
        listQuery: {
          id: this.$route.query.id
        },
        dialogFormVisible: false,
        btnLoading: false,
        dialogStatus: '',
        temp: {
          name: '',
          com_code: '',
          code: ''
        },
        rules: {}
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        orderDetail(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getData()
            })
          }
          if (response.code === 200) {
            this.data = response.data.items[0]
          }
        }).catch(() => {
        })
      },
      logistics(item) {
        this.dialogFormVisible = true
        this.dialogStatus = '填写物流信息'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createLogistisc() {
        this.btnLoading = true
        this.temp.id = this.data.id
        insertLogistics(this.temp).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.createLogistisc()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.btnLoading = false
            this.dialogFormVisible = false
            this.getList()
          }
        }).catch(() => {
        })
      }
    }
  }
</script>


