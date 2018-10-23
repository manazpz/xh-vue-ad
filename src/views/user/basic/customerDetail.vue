<template>
  <div class="app-container">
    <el-form  class="demo-table-expand">
      <el-form-item label="昵称">
        <span>{{info.nickName}}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{info.phone}}</span>
      </el-form-item>
      <el-form-item label="身份">
        <span>{{info.status === '02'?'工作人员':'普通客户'}}</span>
      </el-form-item>
    </el-form>

    <!-- 表格 start -->
    <el-table key='0' :data="collects" v-loading="collectLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column label="收藏列表">
        <el-table-column align="center" :label="$t('table.no')" width="60">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="店铺名" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.shopName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="规格" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.bllParameterStr}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="collectsQuery.pageNum" :page-sizes="[5,10,15]" :page-size="collectsQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="collectTotal">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->

    <!-- 表格 start -->
    <el-table key='1' :data="orders" v-loading="orderLoading" show-summary border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column label="订单列表">
        <el-table-column align="center" :label="$t('table.no')" width="60">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单号" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="price" label="订单价格" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款状态" width="195" align="center">
          <template slot-scope="scope">
            {{ scope.row | payStatus }}
          </template>
        </el-table-column>
        <el-table-column label="订单类型" width="195" align="center" >
          <template slot-scope="scope">
            {{scope.row | orderType}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleFilterOrder" @current-change="handleCurrentChangeOrder"
                     :current-page="ordersQuery.pageNum" :page-sizes="[5,10,15]" :page-size="ordersQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="orderTotal">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->

  </div>
</template>

<script>
  import { customerList } from '@/api/user'
  import { collectList } from '@/api/collect'
  import { orderList } from '@/api/order'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'customerList',
    directives: {
      waves
    },
    data() {
      return {
        info: {
          nickName: '',
          phone: '',
          status: ''
        },
        collects: null,
        collectTotal: null,
        collectLoading: true,
        collectsQuery: {
          pageNum: 1,
          pageSize: 5
        },
        orders: null,
        orderTotal: null,
        orderLoading: true,
        ordersQuery: {
          pageNum: 1,
          pageSize: 5
        }
      }
    },
    created() {
      this.getInfo()
      this.getCollects()
      this.getOrders()
    },
    methods: {
      getInfo() {
        customerList({ id: this.$route.query.id }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getInfo()
            })
          }
          if (response.code === 200) {
            this.info = response.data.items[0]
          }
        }).catch(() => {
        })
      },
      getCollects() {
        this.collectLoading = true
        this.collectsQuery.id = this.$route.query.id
        collectList(this.collectsQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getCollects()
            })
          }
          if (response.code === 200) {
            this.collects = response.data.items
            this.collectTotal = response.data.total
            setTimeout(() => {
              this.collectLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.collectLoading = false
        })
      },
      getOrders() {
        this.orderLoading = true
        this.ordersQuery.buyer = this.$route.query.id
        orderList(this.ordersQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getOrders()
            })
          }
          if (response.code === 200) {
            this.orders = response.data.items
            this.orderTotal = response.data.total
            setTimeout(() => {
              this.orderLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.orderLoading = false
        })
      },
      handleFilter() {
        this.collectsQuery.pageNum = 1
        this.getCollects()
      },
      handleSizeChange(val) {
        this.collectsQuery.pageSize = val
        this.getCollects()
      },
      handleCurrentChange(val) {
        this.collectsQuery.pageNum = val
        this.getCollects()
      },
      handleFilterOrder() {
        this.ordersQuery.pageNum = 1
        this.getOrders()
      },
      handleSizeChangeOrder(val) {
        this.ordersQuery.pageSize = val
        this.getOrders()
      },
      handleCurrentChangeOrder(val) {
        this.ordersQuery.pageNum = val
        this.getOrders()
      }
    }
  }
</script>
