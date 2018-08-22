<template>
  <div class="app-container">

    <!-- 悬浮框 start -->
    <sticky :className="'sub-navbar '+status">
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
  import { userPermission, allotUserPermission } from '@/api/user'
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
        checkedCities: []
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/user/assignPermissions') {
          this.getList()
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      setLocalStorage() {
        window.localStorage.setItem('user', JSON.stringify(this.$route.params.id))
      },
      getList() {
        var res = null
        if (!this.$route.params.id) {
          res = JSON.parse(window.localStorage.getItem('user'))
        } else {
          res = this.$route.params.id
          this.setLocalStorage()
        }
        if (res) {
          this.listLoading = true
          userPermission(res).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.getList()
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
        } else {
          this.listLoading = false
        }
      },
      handleCheckAllChange(val) {
        if (val === 'AM') {
          this.isAm = !this.isAm
        }
      },
      submitForm() {
        this.loading = true
        var params = { userId: JSON.parse(window.localStorage.getItem('user')), permissions: this.checkedCities }
        allotUserPermission(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.submitForm()
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


