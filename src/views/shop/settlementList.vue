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

    <!-- 编辑弹出框 start -->
    <el-dialog title="结算" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="价格" prop="settlementPrice" class="postInfo-container-item">
          <el-input v-model="temp.settlementPrice" required placeholder="请输入结算金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="settlementSubmit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->
  </div>
</template>

<script>
  import { settlementList, settlementUpdate } from '@/api/shop'
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
        btnLoading: false,
        dialogFormVisible: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        temp: {
          settlementPrice: 0
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
      },
      openSettlement(id) {
        this.temp = {
          settlementPrice: 0,
          flag: 'Y',
          id: id
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      settlementSubmit() {
        this.btnLoading = true
        settlementUpdate(this.temp).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.settlementSubmit()
            })
          }
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
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
