<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button type="success" size="mini" @click="handleCreate" class="filter-item" round>新增配置表</el-button>
      <div style="float: right;">
        <label class="filter-item">所属类型：</label>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                  placeholder="所属类型" v-model="listQuery.typef">
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
          {{$t('table.search')}}
        </el-button>
      </div>
    </div>

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="100">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="中文标识" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关键字" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.keyWord}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属类型" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleModifyStatus(scope.row.id)">{{$t('table.delete')}}
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
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" >
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px"
               style='width: 600px; margin-left:40px;'>
        <el-form-item label-width="120px" label="标题" prop="name" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="关键字" prop="keyWord" class="postInfo-container-item">
          <el-input  v-model="temp.keyWord" required placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="数量" prop="num" class="postInfo-container-item">
          <el-input  v-model="temp.num" required placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="归类" prop="type" class="postInfo-container-item">
          <el-input  v-model="temp.type" required placeholder="请输入归类,开发人员根据自己的需求自定义"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="" prop="type" class="postInfo-container-item">
            <el-select v-model="temp.flag" style="width: 200px" >
              <el-option v-for="item in flagOptions" :key="item.key" :label="item.lable" :value="item.key" >
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='添加配置表'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { configList, configInsert, configUpdate, configDelete } from '@/api/config'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'config',
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
          typef: ''
        },
        temp: {
          id: undefined,
          name: '',
          keyWord: '',
          num: '',
          type: '',
          flag: ''
        },
        flagOptions: [{ label: '图片配置', key: '00' }, { label: '非图片配置', key: '01' }],
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        configList(this.listQuery).then(response => {
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
      handleModifyStatus(id) {
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          configDelete({ id: id }).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(id)
              })
            }
            if (response.code === 200) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.listLoading = false
            }
          }).catch(() => {
            this.listLoading = false
          })
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          keyWord: '',
          num: '',
          type: '',
          flag: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '添加配置表'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            configInsert(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.btnLoading = false
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = '更新配置表'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            configUpdate(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.btnLoading = false
            })
          }
        })
      }
    }
  }
</script>
