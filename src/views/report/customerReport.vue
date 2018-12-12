<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="用户名|省份|城市" v-model="listQuery.query">
      </el-input>
      <el-date-picker
        v-model="listQuery.time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" type="primary" v-waves size="mini" v-loading="btnLoading" @click="handleExport">
        导出报表
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.sex | sexFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="首单日期" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.orderTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="省份" width="90" sortable prop="province">
        <template slot-scope="scope">
          <span>{{scope.row.province}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="城市" width="90" sortable prop="city">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="区" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.area}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="详细地址" min-width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单数" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.orderNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.orderPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success"
                      @click="handleOrder(scope.row.id)">查看订单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->

  </div>
</template>

<script>
  import { customerReport } from '@/api/report'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'customerReport',
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
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          query: '',
          time: undefined
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        customerReport(this.listQuery).then(response => {
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
      },
      handleOrder(id) {
        this.$router.push({ name: 'orderList', params: { buyer: id }})
      },
      handleExport() {
        this.btnLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['姓名', '性别', '手机号', '年龄', '收单日期', '省份', '城市', '区', '详细地址', '订单数', '订单金额']
          const filterVal = ['nickName', 'sex', 'phone', 'age', 'orderTime', 'province', 'city', 'area', 'address', 'orderNum', 'orderPrice']
          const query = this.listQuery
          query.noPage = true
          customerReport(query).then(response => {
            if (response.code === 200) {
              const list = response.data.items
              const data = this.formatJson(filterVal, list)
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.filename,
                autoWidth: this.autoWidth
              })
              this.btnLoading = false
            }
          }).catch(() => {
            this.btnLoading = false
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'sex') {
            switch (v[j]) {
              case '1' :
                return '男'
              case '2' :
                return '女'
              default:
                return '未知'
            }
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
