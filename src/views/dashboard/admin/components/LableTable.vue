<template>
  <el-table :data="list" style="width: 100%;height: 317px;padding-top: 15px;">
    <el-table-column label="商品" min-width="100">
      <template slot-scope="scope">
        {{scope.row.goodsName}}
      </template>
    </el-table-column>
    <el-table-column label="类型" min-width="100">
      <template slot-scope="scope">
        {{scope.row.lableName}}
      </template>
    </el-table-column>
    <el-table-column label="店铺" min-width="100">
      <template slot-scope="scope">
        {{scope.row.shopName}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { lableGoods } from '@/api/statistics'
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
        lableGoods().then(response => {
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
