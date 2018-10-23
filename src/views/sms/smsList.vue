<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="短信网关名称" v-model="listQuery.sms_name" clearable>
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="短信网关名" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.sms_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.def}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.def === '未启用'" type="primary" plain @click="handleStatus(scope.row)">启用</el-button>
          <el-button v-else type="primary" plain @click="handleStatus(scope.row)">禁用</el-button>
          <el-button type="danger" plain @click="handleUpdate(scope.row)">编辑</el-button>
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

    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="网关名称"  prop="sms_name" class="postInfo-container-item">
          <el-input v-model="temp.sms_name" required placeholder="请输入网关名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="地址"  prop="url" class="postInfo-container-item">
          <el-input  v-model="temp.url"  required placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="用户名"  prop="username" class="postInfo-container-item">
          <el-input  v-model="temp.username"  required placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="密码"  prop="password" class="postInfo-container-item">
          <el-input  v-model="temp.password"  required placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="产品ID" prop="productid"  class="postInfo-container-item">
          <el-input v-model="temp.productid"   required placeholder="请输入产品ID"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增网关'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->
  </div>
</template>

<script>
  import { querySmsList, updateSms, createSms } from '@/api/sms'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'shopList',
    inject: ['reload'],
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        def: '',
        dialogFormVisible: false,
        dialogStatus: '',
        listQuery: {
          sms_name: '',
          pageNum: 1,
          pageSize: 20,
          status: '01'
        },
        temp: {
          id: '',
          def: '',
          sms_name: '',
          url: '',
          username: '',
          password: '',
          productid: ''
        },
        rule: {
          name: [{ required: true, message: '品牌名称不能为空', trigger: 'change' }],
          official: [{ required: true, message: '品牌网址不能为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        querySmsList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            this.list.forEach((k) => {
              switch (k.def) {
                case 'Y' :
                  k.def = '已启用'
                  break
                case 'N' :
                  k.def = '未启用'
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
      handleStatus(row) {
        if (row.def === '已启用') {
          this.def = 'N'
        } else {
          this.def = 'Y'
        }
        updateSms({ id: row.id, def: this.def }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleSh(row)
            })
          }
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id: '',
          def: '',
          sms_name: '',
          url: '',
          username: '',
          password: '',
          productid: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增网关'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createSms(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleUpdate(row) {
        this.falg = false
        this.temp = Object.assign({}, row)
        if (row.def === '已启用') {
          this.temp.def = 'Y'
        } else {
          this.temp.def = 'N'
        }
        this.dialogStatus = '编辑网关'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateSms(this.temp).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.reload()
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }
</script>
