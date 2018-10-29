<template>
  <div class="app-container">

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="日期" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票抬头" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票内容" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="税号" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.duty}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员名称" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="订单号" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.orderNum}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="价格" min-width="90">
        <template slot-scope="scope">
          <span style="color:red">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.type | invoiceType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success"
                     @click="handleUpdata(scope.row)">修改
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

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="发票抬头：" prop="title" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入发票抬头"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="税号：" prop="duty" class="postInfo-container-item">
          <el-input v-model="temp.duty" required placeholder="请输入税号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="类型：" class="postInfo-container-item">
          <el-radio v-model="temp.type" label="01">个人</el-radio>
          <el-radio v-model="temp.type" label="02">公司</el-radio>
        </el-form-item>
        <el-form-item label-width="110px" label="内容：" prop="content" class="postInfo-container-item">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="temp.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="updateInvoice">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { invoiceList, updateInvoice } from '@/api/invoice/invoice'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'invoice',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        dialogFormVisible: false,
        btnLoading: false,
        dialogStatus: '',
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        temp: {
          id: undefined,
          title: '',
          duty: '',
          type: '',
          content: '',
          createTime: ''
        },
        rules: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        invoiceList(this.listQuery).then(response => {
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
      handleUpdata(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = '修改信息'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateInvoice() {
        updateInvoice(this.temp).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.updateInvoice()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getList()
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
