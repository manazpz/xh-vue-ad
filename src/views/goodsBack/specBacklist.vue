<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"-->
                <!--placeholder="分组名称" v-model="listQuery.name" clearable>-->
      <!--</el-input>-->
      <select-tree  style="width: 200px;" class="filter-item" :options="options" v-model="parentId" :props="defaultProps"/>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="规格组名称" v-model="listQuery.specName" clearable>
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                placeholder="排序号" v-model="listQuery.px" clearable>
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
              style="width: 100%;min-height:100%;" @selection-change="handleSelectionChange" @row-click="handdle">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组名称" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.grouName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格组名称" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.specName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="规格排序" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.px}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提示类型" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.tipsTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click='handleUpdateSpec(scope.row)' size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="success" @click="handleDeleteSpec(scope.row)" size="mini" >删除</el-button>
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
        <el-form-item label-width="110px" label="分组名称" prop="grouName" class="postInfo-container-item">
          <select-tree v-model="temp.grouId" :options="options" :props="defaultProps" >
          </select-tree>
        </el-form-item>
        <el-form-item label-width="110px" label="规格组名称"  prop="specName" class="postInfo-container-item">
          <el-input  v-model="temp.specName"  required placeholder="请输入规格组名称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="规格排序"  prop="px" class="postInfo-container-item">
          <el-input  v-model="temp.px"  required placeholder="请输入规格排序"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="提示类型"  prop="tipsType" class="postInfo-container-item">
          <el-radio-group v-model="temp.tipsType">
              <el-radio :label="item.tipsType" v-for="item in tip_typeListOptions" >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label-width="110px" label="是否多选"  prop="multi" class="postInfo-container-item">
          <el-select clearable  style="width: 100%;" class="filter-item" v-model="temp.obligate" required placeholder="请输入分类属性">
            <el-option key="01" label="否" value="01">
            </el-option>
            <el-option key="02" label="是" value="02">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="规格备注"  class="postInfo-container-item">
          <el-input v-model="temp.remarks" type="textarea"  :rows="5"  placeholder="请输入规格备注"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增规格'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { specList, createSpec, updateSpec, deleteSpec, getClassifyTree } from '@/api/goods'
  import SelectTree from '@/components/widget/SelectTree.vue'
  import waves from '@/directive/waves' // 水波纹指令
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
        list: null,
        total: null,
        type: false,
        listLoading: true,
        fileList: [],
        file: [],
        parentId: '',
        tip_typeListOptions: [{ tipsType: '01', name: '文字' }, { tipsType: '02', name: '图片' }],
        falg: true,
        params: null,
        listQuery: {
          id: undefined,
          name: '',
          px: '',
          grouName: '',
          parentId: '',
          specName: '',
          pageNum: 1,
          pageSize: 10,
          model: '',
          sort: 'lastCreateTime DESC'
        },
        sortOptions: [{ label: '时间正序', key: 'lastCreateTime ASC' }, { label: '时间倒序', key: 'lastCreateTime DESC' }],
        temp: {
          id: undefined,
          grouName: '',
          specName: '',
          tipsType: '',
          px: '',
          multi: '',
          remarks: ''
        },
        typeOptions: [],
        types: {
          model: this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1]
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
      this.getType()
      this.getList()
    },
    methods: {
      getType() {
        getClassifyTree(this.types).then(response => {
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
      getList() {
        this.listLoading = true
        this.listQuery.model = this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1]
        specList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            this.list.forEach((k) => {
              if (k.tipsType === '01') {
                k.tipsTypeValue = '文字'
              } else {
                k.tipsTypeValue = '图片'
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
      handleSelectionChange() {
      },
      handleFilter() {
        this.listQuery.pageNum = 1
        if (this.brandId !== '') {
          this.listQuery.parentId = this.parentId
        } else {
          this.listQuery.parentId = undefined
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
      handdle(row) {
        if (this.falg) {
          this.$router.push({ path: '/goodsBack/specBackValueList', query: { id: row.id }})
        } else {
          this.falg = true
        }
      },
      handleDeleteSpec(row, isValid) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id }
          deleteSpec(params).then(response => {
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
          model: this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1],
          grouName: '',
          specName: '',
          tipsType: '',
          px: '',
          multi: '',
          remarks: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增规格'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createSpec(this.temp).then(response => {
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
      handleUpdateSpec(row) {
        this.falg = false
        if (row.tipsType === '文字') {
          row.tipsType = '01'
        } else {
          row.tipsType = '02'
        }
        this.temp = Object.assign({}, row)
        this.dialogStatus = '编辑规格'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateSpec(this.temp).then((response) => {
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
