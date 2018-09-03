<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="分组名称" v-model="listQuery.name">
      </el-input>
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
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格值名称" min-width="200">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.spec_value_name"></el-input>
          <span v-else>{{scope.row.spec_value_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格值排序" width="200">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.spec_sort"></el-input>
          <span v-else>{{scope.row.spec_sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格值描述" width="200" v-if="showtext" style="display: inline-block">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.tipsText"></el-input>
          <span v-else>{{scope.row.tipsText}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="规格值图片" min-width="200" v-if="showimg" style="display: inline-block">
        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img src="scope.row.tipsImg" width="100%" alt="" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit" type="success" @click="confirmEdit(scope.row)" size="mini" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button v-else type="primary" @click='scope.row.isEdit=!scope.row.isEdit' size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="success"
                      @click="handleModifyStatus(scope.row,'Y')">删除</el-button>
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
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="规格值名称"  prop="spec_value_name" class="postInfo-container-item">
          <el-input v-model="temp.spec_value_name" required placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="规格值排序"  prop="spec_sort" class="postInfo-container-item">
          <el-input  v-model="temp.spec_sort"  required placeholder="请输入规格组名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="规格值描述"  prop="tipsText" class="postInfo-container-item" v-if="showtext" style="display: inline-block">
          <el-input  v-model="temp.tipsText"  required placeholder="请输入规格值描述"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="规格值图片"  prop="tipsImg" class="postInfo-container-item" v-if="showimg" style="display: inline-block">
          <el-upload
            class="avatar-uploader"
            action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img src="temp.tipsImg" width="100%" alt="" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { createSpecValue, specValueList, updateSpecValue } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  export default {
    name: 'brandBacklist',
    inject: ['reload'],
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        id: '',
        showtext: false,
        showimg: false,
        listLoading: true,
        fileList: [],
        file: [],
        falg: true,
        params: null,
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
          spec_value_name: '',
          spec_sort: '',
          tipsImg: '',
          isEnable: false,
          isEdit: false,
          remarks: ''
        },
        dialogStatus: '',
        dialogFormVisible: false,
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        rule: {
          name: [{ required: true, message: '品牌名称不能为空', trigger: 'change' }],
          official: [{ required: true, message: '品牌网址不能为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.id = this.$route.query.id
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        specValueList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            for (var i = 0; i < response.data.items.length; i++) {
              response.data.items[i].isEdit = false
              response.data.items[i].id = this.id
              response.data.items[i].index = i
            }
            if (response.data.tipsType === '01') {
              this.showtext = true
            } else {
              this.showimg = true
            }
            this.list = response.data.items
            this.total = response.data.total
            this.temp.isEdit = false
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleSelectionChange() {
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
      handleUpdateSpecValue(row, isValid) {
        this.$router.push({ path: 'specBackValueList', query: { id: row.id }})
      },
      handleAvatarSuccess(response, file, fileList) {
        this.temp.image = fileList
      },
      handleRemove(file, fileList) {
        this.temp.image = fileList
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          spec_value_name: '',
          spec_sort: '',
          tipsImg: '',
          isEdit: '',
          index: 0,
          remarks: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.temp.id = this.id
        this.dialogStatus = '新增规格值'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createSpecValue(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.getList()
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
      confirmEdit(row) {
        this.listLoading = true
        updateSpecValue(row).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.confirmEdit(row)
            })
          }
          if (response.code === 200) {
            this.getList()
            this.listLoading = false
            row.isEdit = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleModifyStatus(row, isDelete) {
        this.listLoading = true
        const params = { id: row.id, index: row.index, del: isDelete }
        updateSpecValue(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row)
            })
          }
          if (response.code === 200) {
            this.getList()
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        }).catch(() => {
          this.listLoading = false
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
