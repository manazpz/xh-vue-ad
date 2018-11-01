<template>
  <div class="app-container">

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="店铺名" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.shopName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预估价" min-width="110">
        <template slot-scope="scope">
          <span>￥{{scope.row.estimatePrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算价" min-width="110">
        <template slot-scope="scope">
          <span>￥{{scope.row.settlementPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单数" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月份" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.moon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.flag | settlementStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.flag === 'N'"
                     @click="openSettlement(scope.row.id)">结算
          </el-button>
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
  import { settlementList } from '@/api/shop/shop'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'settlementList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          flag: 'Y'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        settlementList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
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
      }
    }
  }
</script>
