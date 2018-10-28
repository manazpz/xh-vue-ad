<template>
  <div class="app-container">
    <el-container style="border:1px solid #c0c0c0">
        <el-container style="border-right:1px solid #c0c0c0;width: 30%">
          <el-main style="border-bottom:1px solid #c0c0c0;padding: 0">
            <el-row style="background: #F3F3F3;padding: 10px">
              <el-col :span="24">订单信息</el-col>
            </el-row>
            <el-row style="padding: 20px 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货地址：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货人：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">联系方式：</el-col>
            </el-row>
            <div style="border:0.5px dashed #F3F3F3;margin: 0 10px 0 10px"></div>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">订单编号：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">下单时间：</el-col>
            </el-row>
            <div style="border:0.5px dashed #F3F3F3;margin: 0 10px 0 10px"></div>
            <el-row style="padding: 10px 0 10px 20px;font-size: 10px">
              <el-col :span="24">商品总价：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">运费：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">优惠金额：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">订单总价：</el-col>
            </el-row>
          </el-main>
          <el-footer style="padding: 0;height:auto">
            <el-row style="background: #F3F3F3;padding: 10px">
              <el-col :span="24">其他信息（发票）</el-col>
            </el-row>
            <el-row style="padding: 20px 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货地址：</el-col>
            </el-row>
            <el-row style="padding: 0 0 10px 20px;font-size: 10px">
              <el-col :span="24">收货人：</el-col>
            </el-row>
          </el-footer>
        </el-container>
        <el-container style="width: 70%">
          <el-main>Main</el-main>
        </el-container>
    </el-container>

    <!--&lt;!&ndash; 表格 start &ndash;&gt;-->
    <!--<el-table :key='tableKey' :data="parameter" v-loading="listLoading" stripe border fit highlight-current-row-->
              <!--@row-click="rowClick" style="width: 100%;min-height:100%;">-->
      <!--<el-table-column align="center" :label="$t('table.no')" min-width="60">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.$index+1}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="图片" min-width="90">-->
        <!--<template slot-scope="scope">-->
          <!--<img v-if="scope.row.imgs[0] != null" :src=" scope.row.imgs[0].url " style="width: 90px;height: 50px">-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="商品" min-width="90">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.goodsName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="商品性质" min-width="90">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.goodsModel}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="规格" min-width="90">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.parameterStr}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="价格" min-width="90">-->
        <!--<template slot-scope="scope">-->
          <!--<span>￥{{scope.row.guJia}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="创建时间" min-width="110">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.createTime}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--&lt;!&ndash; 表格 end &ndash;&gt;-->

    <!--&lt;!&ndash; 分页组件 start &ndash;&gt;-->
    <!--<div class="pagination-container">-->
      <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                     <!--:current-page="listQuery.pageNum" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"-->
                     <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <!--&lt;!&ndash; 分页组件 end &ndash;&gt;-->
  </div>
</template>

<script>
  import { orderList } from '@/api/order/order'
  import splitPane from 'vue-splitpane'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'orderDetail',
    directives: {
      waves
    },
    components: { splitPane },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        model: '',
        parameter: [],
        listLoading: true,
        btnLoading: false,
        dialogStockVisible: false,
        listQuery: {
          id: this.$route.query.id,
          pageNum: 1,
          pageSize: 20,
          number: '',
          orderStatus: '',
          payStatus: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      resize() {
        console.log('resize')
      },
      getList() {
        this.listLoading = true
        orderList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            this.list.forEach((k) => {
              if (k.newOrder !== undefined) {
                k.newOrder.item.forEach((s) => {
                  switch (s.goodsModel) {
                    case '01' :
                      s.goodsModel = '新机'
                      break
                    case '02' :
                      s.goodsModel = '旧机'
                      break
                  }
                  this.parameter.push(s)
                })
              }
              if (k.oldOrder !== undefined) {
                k.oldOrder.item.forEach((s) => {
                  switch (s.goodsModel) {
                    case '01' :
                      s.goodsModel = '新机'
                      break
                    case '02' :
                      s.goodsModel = '旧机'
                      break
                  }
                  this.parameter.push(s)
                })
              }
            })
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      rowClick(row) {
        this.$router.push({ path: 'specBackValueList', query: { id: row.id }})
      }
    }
  }
</script>


