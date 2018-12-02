<template>
  <div class="app-container">
    <el-button type="success" @click="backups" style="float: right;margin-bottom: 5px">备份</el-button>
    <el-table :key='tableKey' :data="list" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" label="备份数据库名" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success"
                     @click="recovery(scope.row)">恢复
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { backupDatabase, backupDatabaseList, recoveryDatabase } from '@/api/dataBase'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'dataBase',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        backupDatabaseList().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
          }
        }).catch(() => {
        })
      },
      backups() {
        this.$confirm('数据库备份中...', '数据库备份', {
          type: 'warning',
          closeOnClickModal: false,
          showCancelButton: false,
          showConfirmButton: false,
          closeOnPressEscape: false,
          showClose: false
        })
        backupDatabase().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.backups()
            })
          }
          if (response.code === 200) {
            setTimeout(() => {
              history.go(0)
            }, 3000)
          }
        }).catch(() => {
        })
      },
      recovery(name) {
        this.$confirm('此操作将恢复数据库到历史版本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$confirm('数据库恢复中...', '数据库恢复', {
            type: 'warning',
            closeOnClickModal: false,
            showCancelButton: false,
            showConfirmButton: false,
            closeOnPressEscape: false,
            showClose: false
          })
          recoveryDatabase({ fileName: name }).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.recovery(name)
              })
            }
            if (response.code === 200) {
              setTimeout(() => {
                store.dispatch('FedLogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }, 3000)
            }
          }).catch(() => {
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
