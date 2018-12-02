<template>
  <div class="app-container">

    <!-- 悬浮框 start -->
    <sticky :className="'sub-navbar '+status">
      <span style="float: left;padding-left: 10px">{{!res.nickName?res.name:res.nickName}}</span>
      <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
      </el-button>
    </sticky>
    <!-- 悬浮框 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;height:100%;margin-top: 20px;" :header-cell-style="{background:'#c0c0c0'}">

      <el-table-column align="center" :label="$t('permission.module')" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.depict')" min-width="1000">
        <template slot-scope="scope">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox v-for="item in scope.row.desc" @change="handleCheckAllChange(item.moduleKey)" :label="item.id" :key="item.id" :disabled="item.moduleKey != 'AM' && isAm">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->


  </div>
</template>

<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { userPermission, allotUserPermission, rolePermission, allotRolePermission } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'
  export default {
    name: 'assignPermissions',
    directives: {
      waves
    },
    components: { Sticky },
    data() {
      return {
        status: 'published',
        tableKey: 0,
        list: null,
        listLoading: true,
        loading: false,
        isAm: false,
        checkedCities: [],
        res: { name: '' }
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/um/assignPermissions') {
          this.getList()
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      setLocalStorage() {
        debugger
        window.localStorage.setItem('mark', JSON.stringify(this.$route.params))
      },
      getList() {
        if (!this.$route.params.id) {
          this.res = JSON.parse(window.localStorage.getItem('mark'))
        } else {
          this.res = this.$route.params
          this.setLocalStorage()
        }
        if (this.res) {
          this.listLoading = true
          if (this.res.mark === 'user') this.getUserPermisson(this.res.id)
          if (this.res.mark === 'role') this.getRolePermisson(this.res.id)
        } else {
          this.listLoading = false
        }
      },
      getUserPermisson(id) {
        userPermission(id).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getUserPermisson(id)
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.checkedCities = response.data.checkedCities
            this.isAm = false
            for (var i = 0; i <= this.list.length; i++) {
              var key = this.list[i].key
              if (key === 'AM') {
                for (var j = 0; j <= this.checkedCities.length; j++) {
                  var str1 = this.checkedCities[j]
                  var str2 = this.list[i].desc[0].id
                  if (str1 === str2) {
                    this.isAm = true
                    break
                  }
                }
                break
              }
            }
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      getRolePermisson(id) {
        rolePermission(id).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getRolePermisson(id)
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.checkedCities = response.data.checkedCities
            this.isAm = false
            for (var i = 0; i <= this.list.length; i++) {
              var key = this.list[i].key
              if (key === 'AM') {
                for (var j = 0; j <= this.checkedCities.length; j++) {
                  var str1 = this.checkedCities[j]
                  var str2 = this.list[i].desc[0].id
                  if (str1 === str2) {
                    this.isAm = true
                    break
                  }
                }
                break
              }
            }
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCheckAllChange(val) {
        if (val === 'AM') {
          this.isAm = !this.isAm
        }
      },
      submitForm() {
        this.loading = true
        if (JSON.parse(window.localStorage.getItem('mark')).mark === 'user') this.submitUser()
        if (JSON.parse(window.localStorage.getItem('mark')).mark === 'role') this.submitRole()
      },
      submitUser() {
        var params = { userId: JSON.parse(window.localStorage.getItem('mark')).id, permissions: this.checkedCities }
        allotUserPermission(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.submitUser()
            })
          }
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      },
      submitRole() {
        var params = { roleId: JSON.parse(window.localStorage.getItem('mark')).id, permissions: this.checkedCities }
        allotRolePermission(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.submitRole()
            })
          }
          if (response.code === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>


