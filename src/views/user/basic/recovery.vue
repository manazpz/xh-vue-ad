<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" clearable
                placeholder="回收方式" v-model="listQuery.types">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" size="mini"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回收方式" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.types}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('user.createTime')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="50" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.isValid === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleDeleteRecovery(scope.row.id)">{{$t('table.delete')}}
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

    <!-- 编辑弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="回收方式" prop="types" class="postInfo-container-item">
          <el-input v-model="temp.types" required placeholder="请输入回收方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增回收方式'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { recoveryList, createRecovery, updateRecovery } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'recovery',
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
        btnLoading: false,
        passwordType: 'password',
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          types: undefined,
          sort: 'updateTime DESC'
        },
        sortOptions: [{ label: '时间正序', key: 'updateTime ASC' }, { label: '时间倒序', key: 'updateTime DESC' }],
        temp: {
          id: undefined,
          types: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          types: [{ required: true, message: '回收方式不为空', trigger: 'blur' }]
        },
        multipleSelection: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        recoveryList(this.listQuery).then(response => {
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = '编辑回收方式'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateRecovery(this.temp).then((response) => {
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
      },
      handleDeleteRecovery() {
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          types: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增回收方式'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createRecovery(this.temp).then(response => {
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
      }
    }
  }
</script>
