<template>
  <div class="app-container">

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="parameter" v-loading="listLoading" stripe border fit highlight-current-row
              @row-click="rowClick" style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" min-width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" min-width="90">
        <template slot-scope="scope">
          <img v-if="scope.row.imgs[0] != null" :src=" scope.row.imgs[0].url " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品性质" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.goodsModel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.parameterStr}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" min-width="90">
        <template slot-scope="scope">
          <span>￥{{scope.row.guJia}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="110">
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
        model: '',
        parameter: [],
        listLoading: true,
        btnLoading: false,
        dialogStockVisible: false,
        listQuery: {
          id: '',
          pageNum: 1,
          pageSize: 20,
          number: '',
          orderStatus: '',
          payStatus: ''
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
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
