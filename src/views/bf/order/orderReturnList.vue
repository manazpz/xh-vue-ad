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
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.status" placeholder="退货状态">
        <el-option key="01" label="已完成" value="01">
        </el-option>
        <el-option key="02" label="未完成" value="02">
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
      <el-table-column align="center" label="订单编号" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买人" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.buyer}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="实付金额" min-width="90">
        <template slot-scope="scope">
          <span style="color:red">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款状态" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.payStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.orderStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="退货原因" min-width="220">
        <template slot-scope="scope">
          <span>{{scope.row.reason}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="退货状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" @click="handleDetail(scope.row.id)">查看订单详情
          </el-button>
          <el-dropdown>
            <el-button type="primary" >
              {{$t('table.actions')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native = "handleBtn(scope.row,'Y')">同意</el-dropdown-item>
              <el-dropdown-item  @click.native = "handleBtn(scope.row,'N')">拒绝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  import { orderReturnList, updataOrderReturn } from '@/api/order/order'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'orderList',
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
          number: '',
          status: '',
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
        orderReturnList(this.listQuery).then(response => {
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
                  k.payStatusName = '未付款'
                  break
                case '02' :
                  k.payStatusName = '已付款'
                  break
                case '03' :
                  k.payStatusName = '已取消'
                  break
              }
              switch (k.orderStatus) {
                case '01' :
                  k.orderStatusName = '已完成'
                  break
                case '02' :
                  k.orderStatusName = '已取消'
                  break
                case '03' :
                  k.orderStatusName = '进行中'
                  break
                case '04' :
                  k.orderStatusName = '售后中'
                  break
              }
              switch (k.status) {
                case '01' :
                  k.statusName = '已完成'
                  break
                case '02' :
                  k.statusName = '未完成'
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
      handleDetail(row) {
        this.$router.push({ path: 'orderBfDetail', query: { id: row }})
      },
      handleBtn(row, item) {
        var res = {
          id: row.id,
          no: row.no,
          audit: item,
          status: '01'
        }
        updataOrderReturn(res).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleBtn()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.btnLoading = false
            this.getList()
          }
        }).catch(() => {

        })
      }
    }
  }
</script>
