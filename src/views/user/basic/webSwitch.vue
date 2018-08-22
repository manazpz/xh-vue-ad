<template>
  <div class="app-container">

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;height:100%;">
      <el-table-column align="center" :label="$t('table.name')" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.type')" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.createTime')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.updateTime')" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.isSwitch === 'Y'" icon-class="valid" class="table-status" />
          <svg-icon v-else icon-class="noValid" class="table-status" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isSwitch === 'Y'" size="mini" type="danger"
                     @click="handleModifyStatus(scope.row, 'N')">{{$t('table.off')}}
          </el-button>
          <el-button  v-else size="mini" type="success"
                      @click="handleModifyStatus(scope.row, 'Y')">{{$t('table.on')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

  </div>
</template>

<script>
  import { switchs, updateSwitch } from '@/api/user'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'webSwitch',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        listLoading: true,
        listQuery: {
          type: 'WS'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        switchs(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleModifyStatus(row, isSwitch) {
        this.listLoading = true
        const params = { id: row.id, isSwitch: isSwitch }
        updateSwitch(params).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleModifyStatus(row, isSwitch)
            })
          }
          if (response.code === 200) {
            this.listLoading = false
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.isSwitch = isSwitch
          }
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
