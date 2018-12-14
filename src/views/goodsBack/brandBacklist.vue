<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <select-tree  class="filter-item" :options="options" v-model="brandId" :props="defaultProps"/>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌图片" min-width="140">
        <template slot-scope="scope">
          <!--<img :src="scope.row.scope" >-->
          <img v-if="scope.row.imgUrl != null" :src=" scope.row.imgUrl " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌名称" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌网址" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.officialWebsite}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="摘要" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'Y')">{{$t('table.delete')}}
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


    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 500px; margin-left:50px;'>
        <el-form-item label-width="110px" label="品牌名称"  prop="name" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="所属分类" class="postInfo-container-item">
          <el-checkbox-group v-model="temp.checkList">
            <el-checkbox v-for="item in classOptions" :label="item.id" :key="item.id">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="110px" label="品牌网址"  prop="officialWebsite" class="postInfo-container-item">
          <el-input  v-model="temp.officialWebsite"  required placeholder="请输入品牌网址"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="摘要"  class="postInfo-container-item">
          <el-input v-model="temp.remarks" type="textarea"  :rows="5"  placeholder="请摘要内容"></el-input>
        </el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handlePictureCardSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleError">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增品牌'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { brandList, createBrand, updateBrand, deleteBrand, brandClassList, getBrandTree } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import SelectTree from '@/components/widget/SelectTree.vue'
  import store from '@/store'
  export default {
    name: 'brandBacklist',
    inject: ['reload'],
    directives: {
      waves
    },
    components: {
      SelectTree
    },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: null,
        listLoading: true,
        action: process.env.BASE_API + '/resources/uploadFile',
        fileList: [],
        file: [],
        falg: true,
        brandId: '',
        params: null,
        imageUrl: undefined,
        classOptions: null,
        listQuery: {
          id: undefined,
          name: '',
          pageNum: 1,
          pageSize: 10,
          sort: 'lastCreateTime DESC'
        },
        sortOptions: [{ label: '时间正序', key: 'lastCreateTime ASC' }, { label: '时间倒序', key: 'lastCreateTime DESC' }],
        temp: {
          id: undefined,
          name: '',
          officialWebsite: '',
          checkList: [],
          imageUrl: '',
          remarks: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        dialogSubStatus: '',
        dialogFormSubVisible: false,
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        rule: {
          name: [{ required: true, message: '品牌名称不能为空', trigger: 'change' }],
          officialWebsite: [{ required: true, message: '品牌网址不能为空', trigger: 'change' }],
          checkList: [{ required: true, message: '品牌分类不能为空', trigger: 'change' }]
        },
        // 默认选中值
        selected: 'A',
        // 数据默认字段
        defaultProps: {
          // 父级唯一标识
          parent: 'parentId',
          // 唯一标识
          value: 'id',
          // 标签显示
          label: 'label',
          // 子级
          children: 'children'
        },
        // 数据列表
        options: []
      }
    },
    created() {
      this.getList()
      this.getClass()
      this.getType()
    },
    methods: {
      getList() {
        this.listLoading = true
        brandList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.total = response.data.total
            response.data.items.forEach((value, index) => {
              var lists = []
              if (value.checkList.length > 0) {
                value.checkList.forEach((values, index) => {
                  lists.push(values.parentId)
                })
                value.checkList = lists
              } else {
                value.checkList = []
              }
            })
            this.list = response.data.items
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      getType() {
        getBrandTree(this.types).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getType()
            })
          }
          if (response.code === 200) {
            this.options = response.data.items
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      getClass() {
        brandClassList(this.listQuery).then(response => {
          if (response.code === 200) {
            this.classOptions = response.data.items
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        if (this.brandId !== '') {
          this.listQuery.id = this.brandId
        } else {
          this.listQuery.id = undefined
        }
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
      handleRemove(file, fileList) {
        this.temp.file = fileList
      },
      beforeRemove(file, fileList) {
        return this.$confirm('此操作将删除附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return true
        })
      },
      handlePictureCardSuccess(response, file, fileList) {
        this.imageUrl = response.data.file.url
        this.file = response.data.file
      },
      handleError() {
        this.$message.error('上传文件失败!')
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleModifyStatus(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id }
          deleteBrand(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.reload()
              this.listLoading = false
              this.dialogFormVisible = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              row.del = isValid
            }
          }).catch(() => {
            this.listLoading = false
            this.falg = true
          })
        }).catch(_ => {
          return
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          file: [],
          classId: [],
          checkList: [],
          officialWebsite: '',
          imageUrl: '',
          remarks: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.temp.file = []
        this.imageUrl = undefined
        this.temp.checkList = []
        this.dialogStatus = '新增品牌'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.temp.file = this.file
            this.temp.classId = this.temp.checkList
            createBrand(this.temp).then(response => {
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
        this.imageUrl = this.temp.imgUrl
        this.dialogStatus = '编辑品牌'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.temp.file = this.file
            this.temp.classId = this.temp.checkList
            updateBrand(this.temp).then((response) => {
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
