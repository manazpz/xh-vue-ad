<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type"
                 placeholder="类型">
        <el-option v-for="item in  statementTypeOptions" :key="item.keyWord" :label="item.name"
                   :value="item.keyWord">
        </el-option>
      </el-select>
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
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="简称" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图标" width="110">
        <template slot-scope="scope">
          <img :src=" scope.row.imgUrl " style="width: 30px;height: 30px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.name')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.createTime')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.updateTime')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="danger"
                      @click="handleModifyStatus(scope.row)">{{$t('table.delete')}}
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
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 600px; margin-left:50px;'>
        <el-form-item label-width="70px" label="简称" prop="nickName" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入简称"></el-input>
        </el-form-item>
        <el-form-item label-width="70px" label="类型" prop="nickName" class="postInfo-container-item">
          <el-select clearable class="filter-item" style="width: 130px" v-model="temp.type"
                     placeholder="请选择类型">
            <el-option v-for="item in  statementTypeOptions" :key="item.keyWord" :label="item.name"
                       :value="item.keyWord">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="70px" label="上传图标" prop="nickName" class="postInfo-container-item">
          <el-upload
            :action="action"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList"
            :data="{path:'icon'}"
            :before-upload="beforeAvatarUpload"
            :on-success="handlePictureCardSuccess"
            :on-exceed="handExceed"
            :on-error="handleError"
            :before-remove="handleBeforeRemove"
            :on-remove="handleRemove">
            <el-tooltip class="item" effect="light" content="请上传jpg/png格式,不大于2M的图片" placement="bottom" >
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="70px" label="内容" prop="nickName" class="postInfo-container-item">
          <Ueditor v-model="temp.content" id="ueditor" :config="config" ref="ueditor"></Ueditor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='创建声明'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { getConfig, deleteFile } from '@/api/user'
  import { queryStatements, insertStatement, updateStatement, deleteStatements } from '@/api/statement'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  import Ueditor from '@/components/Ueditor'

  export default {
    name: 'statement',
    directives: {
      waves
    },
    components: { Ueditor },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        action: process.env.BASE_API + '/resources/uploadFile',
        listLoading: true,
        btnLoading: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          type: ''
        },
        fileList: [],
        statementTypeOptions: [],
        temp: {
          id: undefined,
          title: '',
          type: '',
          icon: '',
          content: ''
        },
        config: {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '',
          autoClearinitialContent: false,
          initialFrameWidth: null,
          initialFrameHeight: 400,
          BaseUrl: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
        }
      }
    },
    created() {
      this.getType()
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        queryStatements(this.listQuery).then(response => {
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
      getType() {
        getConfig({ type: '\'STATEMENT\'' }).then(response => {
          this.statementTypeOptions = response.data.items
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
      handleModifyStatus(row) {
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          row.path = 'icon'
          deleteStatements(row).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row)
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
          title: '',
          type: '',
          icon: '',
          content: ''
        }
        if (this.$refs.ueditor) {
          this.$refs.ueditor.clearContent()
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '创建声明'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            this.temp.files = this.fileList
            insertStatement(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.fileList = []
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
        this.dialogStatus = '编辑声明'
        this.dialogFormVisible = true
        if (this.$refs.ueditor) {
          this.$refs.ueditor.setContent(this.temp.content)
        } else {
          this.config.initialContent = this.temp.content
        }
        this.fileList = []
        if (this.temp.imgId) {
          this.fileList.push({ 'id': this.temp.imgId, 'url': this.temp.imgUrl, 'extend': this.temp.imgExtend })
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            this.temp.files = this.fileList
            updateStatement(this.temp).then(response => {
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
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handlePictureCardSuccess(response, file, fileList) {
        this.fileList.push(response.data.file)
      },
      handleBeforeRemove() {
        return this.$confirm('此操作将删除附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList[0].path = 'icon'
          return deleteFile(this.fileList[0]).then(response => {
            if (response.code === 200) {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      },
      handleRemove(file, fileList) {
        this.fileList = []
      },
      handleError() {
        this.$message.error('上传文件失败!')
      },
      handExceed() {
        this.$message.error('图片上传限制1个，请先删除以后的图片!')
      }
    }
  }
</script>
