<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('user.nickName')" v-model="listQuery.nickName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('user.userName')" v-model="listQuery.userName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('user.phone')" v-model="listQuery.phone">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status"
                 :placeholder="$t('user.statusName')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.keyWord" :label="item.name"
                   :value="item.keyWord">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
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
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.nickName')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.userName')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.phone')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.name')" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.statusName')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.statusName}}</span>
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
      <el-table-column width="50" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.isValid === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="success" size="mini" >
              {{$t('table.actions')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native = "handleUpdate(scope.row)">{{$t('table.edit')}}</el-dropdown-item>
              <el-dropdown-item @click.native = "resetPwd(scope.row)">{{$t('user.resetPwd')}}</el-dropdown-item>
              <el-dropdown-item @click.native = "permissions(scope.row)">{{$t('route.assignPermissions')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-if="scope.row.isValid === 'Y'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'N')">{{$t('table.delete')}}
          </el-button>
          <el-button  v-else size="mini" type="success"
                      @click="handleModifyStatus(scope.row, 'Y')">{{$t('table.recovery')}}
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
        <el-form-item label-width="110px" :label="$t('user.nickName')" prop="nickName" class="postInfo-container-item">
          <el-input v-model="temp.nickName" required placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('user.userName')" prop="userName" class="postInfo-container-item">
          <el-input v-if="dialogStatus=='创建用户'" v-model="temp.userName" required placeholder="请输入用户名"></el-input>
          <el-input v-else v-model="temp.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='创建用户'" label-width="110px" :label="$t('user.password')" prop="password" class="postInfo-container-item">
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="temp.password" autoComplete="on"
                    placeholder="请输入密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('user.phone')" prop="phone" class="postInfo-container-item">
          <el-input v-model="temp.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" :label="$t('user.statusName')" prop="status" class="postInfo-container-item">
          <el-select clearable v-model="temp.status" >
            <el-option v-for="item in calendarTypeOptions" :key="item.keyWord" :label="item.name" :value="item.keyWord" >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='创建用户'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { getConfig, userList, deleteUser, insertUser, updateUser, changePwd } from '@/api/user'
  import { keyToValue } from '@/utils/common'
  import { checkPhone } from '@/utils/validate'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'userList',
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
          nickName: undefined,
          userName: undefined,
          phone: undefined,
          status: undefined,
          sort: 'updateTime DESC'
        },
        type: { type: '\'CUSTOMER\', \'ADMIN\'' },
        calendarTypeOptions: [],
        sortOptions: [{ label: '时间正序', key: 'updateTime ASC' }, { label: '时间倒序', key: 'updateTime DESC' }],
        temp: {
          id: undefined,
          nickName: '',
          userName: '',
          password: '',
          phone: '',
          status: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          nickName: [{ required: true, message: '昵称不为空', trigger: 'blur' }],
          userName: [{ required: true, message: '用户名不为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
          phone: [{ required: false, validator: checkPhone, trigger: 'blur' }],
          status: [{ required: true, message: '身份不为空', trigger: 'change' }]
        },
        multipleSelection: []
      }
    },
    created() {
      this.getType()
      this.getList()
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      getList() {
        this.listLoading = true
        userList(this.listQuery).then(response => {
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
        getConfig(this.type).then(response => {
          this.calendarTypeOptions = response.data.items
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
      handleModifyStatus(row, isValid) {
        this.listLoading = true
        const params = { id: row.id, isValid: isValid }
        deleteUser(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row, isValid)
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.isValid = isValid
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          nickName: '',
          userName: '',
          password: '',
          phone: '',
          status: 'AD'
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '创建用户'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            insertUser(this.temp).then(response => {
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = '更新用户'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            updateUser(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.temp.statusName = keyToValue(this.calendarTypeOptions)[this.temp.status]
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
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
      permissions(row) {
        this.$router.push({ name: 'assignPermissions', params: row })
      },
      resetPwd(row) {
        this.listLoading = true
        changePwd(row, false).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.resetPwd(row)
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.$notify({
              title: '成功',
              message: '重置成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
