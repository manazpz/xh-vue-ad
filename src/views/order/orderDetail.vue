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
            <el-col :span="24">其他信息（发票）</el-col>
          </el-row>
          <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
            <el-col :span="24">送货时间：任意时间</el-col>
          </el-row>
        </el-footer>
      </el-container>
      <el-container style="width: 70%">
        <el-main>
          <el-row style="background: #F3F3F3;padding: 10px">
            <el-col :span="24">订单状态：{{data.orderStatus | orderStatus}}</el-col>
          </el-row>
          <el-row style="padding: 10px 0 0 20px;font-size: 10px">
            <el-col :span="24">1.送货时间：任意时间</el-col>
          </el-row>
          <el-row style="padding: 10px 0 0 20px;font-size: 10px">
            <el-col :span="24">2.发票抬头：{{data.invoiceTitle}}</el-col>
          </el-row>
          <el-row style="padding: 10px 0 0 20px;font-size: 10px">
            <el-col :span="24">3.发票内容：{{data.invoiceContent}}</el-col>
          </el-row>
          <!--<el-row style="padding: 10px 0 10px 50px;font-size: 10px">-->
          <!--<el-col :span="24">订单操作原因：无</el-col>-->
          <!--</el-row>-->
        </el-main>
      </el-container>
    </el-container>

    <el-table :key='tableKey' :data="data.goods"  stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="订单编号" width="100">
        <template slot-scope="prop">
          <span>{{prop.row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="150">
        <template slot-scope="prop">
          <img v-if="prop.row.imgs[0] != null" :src=" prop.row.imgs[0].url " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格" min-width="150" :show-overflow-tooltip="true">
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
      <el-table-column align="center" label="状态" width="70" :show-overflow-tooltip="true">
        <template slot-scope="prop">
          <span>{{prop.row.checkStatus | jcStatus}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { orderList } from '@/api/order/order'
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
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        orderList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getData()
            })
          }
          if (response.code === 200) {
            if(response.data.items.length > 0)
              this.data = response.data.items[0]
          }
        }).catch(() => {
        })
      }
    }
  }
</script>


