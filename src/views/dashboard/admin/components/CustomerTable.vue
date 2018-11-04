<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;height: 317px;">
    <el-table-column label="客户" min-width="200">
      <template slot-scope="scope">
        {{scope.row.nickName}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { customers } from '@/api/statistics'
  import store from '@/store'
  export default {
    data() {
      return {
        list: null
      }
    },
    created() {
      // 模拟数据
      this.getData()
    },
    methods: {
      getData() {
        customers().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getData()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
