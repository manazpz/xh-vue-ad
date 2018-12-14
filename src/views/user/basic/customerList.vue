<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('user.nickName')" v-model="listQuery.nickName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('user.phone')" v-model="listQuery.phone">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" @row-click="rowClick" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110">
        <template slot-scope="scope">
          <img :src=" scope.row.headPortrait " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.nickName')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.phone')" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.statusName')" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.status === '02'?'工作人员':'普通用户'}}</span>
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
          <el-button type="success"
                     @click="handleRole(scope.row.id)">分配角色
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
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="70px"
               style='width: 500px; margin-left:50px;'>
        <el-transfer
          v-model="temp.roles"
          filterable
          :titles="['未设权限', '已设权限']"
          :filter-method="filterMethod"
          :props="{
          key: 'id',
          label: 'name'
        }"
          :data="allRole">
        </el-transfer>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button vtype="primary" v-loading="btnLoading" @click="submitRole">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { customerList, roleList, userRoleList, allotUserRole } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'customerList',
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
        dialogFormVisible: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          nickName: '',
          status: '',
          phone: ''
        },
        allRole: [],
        temp: {
          id: undefined,
          roles: []
        },
        statusOptions: [{ label: '普通客户', key: '01' }, { label: '工作人员', key: '02' }],
        rules: {
        }
      }
    },
    created() {
      this.getRoles()
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        customerList(this.listQuery).then(response => {
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
      getRoles() {
        roleList().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getRoles()
            })
          }
          if (response.code === 200) {
            this.allRole = response.data.items
          }
        }).catch(() => {
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
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1
      },
      handleRole(id) {
        userRoleList({ userId: id }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleRole(id)
            })
          }
          if (response.code === 200) {
            this.temp.id = id
            this.temp.roles = response.data.items
            this.dialogFormVisible = true
          }
        }).catch(() => {
        })
      },
      submitRole() {
        this.btnLoading = true
        allotUserRole(this.temp).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.submitRole()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.btnLoading = false
          }
        }).catch(() => {
          this.btnLoading = false
        })
      },
      rowClick(row, event, column) {
        if (column.label !== '操作') {
          this.$router.push({ name: 'customerDetail', query: { id: row.id }})
        }
      }
    }
  }
</script>
