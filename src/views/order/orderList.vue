<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" clearable
                placeholder="订单编号" v-model="listQuery.number">
      </el-input>
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.orderStatus" placeholder="订单状态">

        <el-option key="01" label="已完成" value="01">
        </el-option>
        <el-option key="02" label="已取消" value="02">
        </el-option>
        <el-option key="03" label="进行中" value="03">
        </el-option>
        <el-option key="04" label="售后中" value="04">
        </el-option>
      </el-select>
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.payStatus" placeholder="付款状态">
        <el-option key="01" label="未付款" value="01">
        </el-option>
        <el-option key="02" label="已付款" value="02">
        </el-option>
        <el-option key="03" label="已取消" value="03">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="110">
        <template slot-scope="scope">
          <!--<img v-if="scope.row.imgs[0] != null" :src=" scope.row.imgs[0].url " style="width: 90px;height: 50px">-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单编号" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" min-width="90">
        <template slot-scope="scope">
          <span>￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.payStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.orderStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收/发货状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->
  </div>
</template>

<script>
  import { orderList } from '@/api/order'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'goodsBackList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        btnLoading: false,
        dialogStockVisible: false,
        listQuery: {
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
              switch (k.payStatus) {
                case '01' :
                  k.payStatus = '未付款'
                  break
                case '02' :
                  k.payStatus = '已付款'
                  break
                case '03' :
                  k.payStatus = '已取消'
                  break
              }
              switch (k.orderStatus) {
                case '01' :
                  k.orderStatus = '已完成'
                  break
                case '02' :
                  k.orderStatus = '已取消'
                  break
                case '03' :
                  k.orderStatus = '进行中'
                  break
                case '04' :
                  k.orderStatus = '售后中'
                  break
              }
              switch (k.deliveryStatus) {
                case '01' :
                  k.deliveryStatus = '已发货'
                  break
                case '02' :
                  k.deliveryStatus = '未发货'
                  break
                case '03' :
                  k.deliveryStatus = '已收货'
                  break
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
      handleUpdate(val) {
      }
    }
  }
</script>
