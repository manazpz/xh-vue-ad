<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('permission.depict')" v-model="listQuery.depict">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.moduleKey"
                 :placeholder="$t('permission.module')">
        <el-option v-for="item in  calendarModuleOptions" :key="item.keyWord" :label="item.name"
                   :value="item.keyWord">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
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
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.depict')" width="200">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.depict"></el-input>
          <span v-else>{{scope.row.depict}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.type')" width="200">
        <template slot-scope="scope">
          <el-tag>{{scope.row.type | typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.module')" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.moduleName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.extend')" width="200">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.extend"></el-input>
          <span v-else>{{scope.row.extend}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.createTime')" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.isEnable === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit" type="success" @click="confirmEdit(scope.row)" size="mini" icon="el-icon-circle-check-outline">{{$t('table.save')}}</el-button>
          <el-button v-else type="primary" @click='scope.row.isEdit=!scope.row.isEdit' size="mini" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.isEnable === 'Y'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, false)">{{$t('table.noEnable')}}
          </el-button>
          <el-button  v-else size="mini" type="success"
                      @click="handleModifyStatus(scope.row, true)">{{$t('table.recovery')}}
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
        <el-form-item label-width="110px" :label="$t('permission.name')" prop="name" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入名称(模块-操作描述)"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('permission.depict')" class="postInfo-container-item">
          <el-input v-model="temp.depict" required placeholder="简要描述"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('permission.type')" class="postInfo-container-item">
          <el-select v-model="temp.type" style="width: 200px" >
            <el-option v-for="item in calendarTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('permission.module')" class="postInfo-container-item">
          <el-select v-model="temp.module" style="width: 100px" >
            <el-option v-for="item in calendarModuleOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('permission.extend')" class="postInfo-container-item">
          <el-input v-model="temp.extend" placeholder="过滤条件"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" class="postInfo-container-item">
          <el-checkbox v-model="temp.isEnable" label="是否有效" border></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { permissionList, getConfig, insertPermission, updatePermission } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import { keyToValue } from '@/utils/common'
  import store from '@/store'

  const calendarTypeOptions = store.getters.permission_types

  export default {
    name: 'permissionList',
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
          moduleName: undefined,
          desc: undefined,
          sort: 'createTime DESC'
        },
        type: { type: '\'MODULES\'' },
        calendarModuleOptions: [],
        calendarTypeOptions,
        sortOptions: [{ label: '时间正序', key: 'createTime ASC' }, { label: '时间倒序', key: 'createTime DESC' }],
        temp: {
          id: undefined,
          name: '',
          depict: '',
          type: 'ACTION',
          module: 'UM',
          extend: '',
          isEnable: false,
          isEdit: false
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          name: [{ required: true, message: '名字不为空', trigger: 'blur' }]
        }
      }
    },
    filters: {
      typeFilter(type) {
        return keyToValue(calendarTypeOptions)[type]
      }
    },
    created() {
      this.getType()
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        permissionList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            for (var i = 0; i < response.data.items.length; i++) {
              response.data.items[i].isEdit = false
            }
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
        getConfig(this.type).then(response => {
          this.calendarModuleOptions = response.data.items
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
      handleModifyStatus(row, isEnable) {
        this.listLoading = true
        const params = { id: row.id, isEnable: isEnable }
        updatePermission(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row, isEnable)
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.isEnable = isEnable ? 'Y' : 'N'
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          depict: '',
          type: 'ACTION',
          module: 'UM',
          extend: '',
          isEnable: false,
          isEdit: false
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '创建权限'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            insertPermission(this.temp).then(response => {
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
                  message: '创建成功',
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
      confirmEdit(row) {
        this.listLoading = true
        updatePermission(row).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.confirmEdit(row)
            })
          }
          if (response.code === 200) {
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
      handleDelete(row) {
      }
    }
  }
</script>
