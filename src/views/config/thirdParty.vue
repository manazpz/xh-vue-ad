<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button type="success" size="mini" @click="handleCreate" class="filter-item" round>新增第三方配置</el-button>
    </div>

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台标识" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="accessKeyId" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.accessKeyId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="accessKeySecret" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.accessKeySecret}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="mchid" width="90" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.mchid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="key" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.keyword}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="endpoint" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.endpoint}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="backetName" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.backetName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="回调地址" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.returnUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.updateTime')" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
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

    <!-- 编辑弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" >
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px"
               style='width: 600px; margin-left:40px;'>
        <el-form-item label-width="120px" label="平台名" prop="name" class="postInfo-container-item">
          <el-input :disabled="editFlag" v-model="temp.name" required placeholder="请输入平台名"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="平台标识" prop="platform" class="postInfo-container-item">
          <el-input :disabled="editFlag" v-model="temp.platform" required placeholder="请输入平台标识"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="accessKeyId" prop="accessKeyId" class="postInfo-container-item">
          <el-input v-model="temp.accessKeyId" required placeholder="请输入accessKeyId"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="accessKeySecret" prop="accessKeySecret" class="postInfo-container-item">
          <el-input v-model="temp.accessKeySecret" required placeholder="请输入accessKeySecret"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="mchid" prop="mchid" class="postInfo-container-item">
          <el-input v-model="temp.mchid" required placeholder="请输入mchid"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="key" prop="keyword" class="postInfo-container-item">
          <el-input v-model="temp.keyword" required placeholder="请输入key"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="endpoint" prop="endpoint" class="postInfo-container-item">
          <el-input v-model="temp.endpoint" required placeholder="请输入endpoint"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="backetName" prop="backetName" class="postInfo-container-item">
          <el-input v-model="temp.backetName" required placeholder="请输入backetName"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="回调地址" prop="returnUrl" class="postInfo-container-item">
          <el-input v-model="temp.returnUrl" required placeholder="请输入回调地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='创建第三方配置'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { tppConfigList, tppConfigInsert, tppConfigUpdate, tppConfigDelete } from '@/api/config'
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
        editFlag: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        temp: {
          id: undefined,
          name: '',
          platform: '',
          accessKeyId: '',
          accessKeySecret: '',
          mchid: '',
          keyword: '',
          endpoint: '',
          backetName: '',
          returnUrl: ''
        },
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
        tppConfigList(this.listQuery).then(response => {
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
          tppConfigDelete({ id: id }).then(response => {
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
          platform: '',
          accessKeyId: '',
          accessKeySecret: '',
          mchid: '',
          keyword: '',
          endpoint: '',
          backetName: '',
          returnUrl: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '创建第三方配置'
        this.dialogFormVisible = true
        this.editFlag = false
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            tppConfigInsert(this.temp).then(response => {
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
        this.dialogStatus = '更新第三方配置'
        this.dialogFormVisible = true
        this.editFlag = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            tppConfigUpdate(this.temp).then(response => {
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
