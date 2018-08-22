<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{scope.row.order_no |  orderNoFilter}}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      list: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  created() {
    // 模拟数据
    this.list = [{ order_no: '8470AADB-F1Ac-aBfC-aCbB-6b454cE27c45', timestamp: 26355410080, username: 'Laura Miller', price: 3060, status: 'success' },
      { order_no: 'A9bCce1F-2e8b-0729-D59b-81602beE3dAA', timestamp: 319238860627, username: 'Daniel Martinez', price: 4232, status: 'pending' },
      { order_no: '5CF22bC6-5FcC-d3b7-E3F0-6E9d4d1f8428', timestamp: 274308148430, username: 'Angela Jackson', price: 3728.07, status: 'pending' },
      { order_no: '4A9362AF-dCAE-20f2-d93f-8dDaacf29F7a', timestamp: 376929779644, username: 'Charles Robinson', price: 14794.6, status: 'success' },
      { order_no: 'Ec6db6Cd-40F6-BDb6-0DcC-8bb1132F7d7F', timestamp: 771001953309, username: 'Karen Perez', price: 3413.4, status: 'pending' },
      { order_no: '480998C8-99BD-7F9D-fAf4-F5fFBeeaED62', timestamp: 629434653322, username: 'Maria Brown', price: 3155.25, status: 'success' },
      { order_no: '2F45B0D2-FF8F-4Cbb-218a-c219f2E4eFCd', timestamp: 282575482347, username: 'Deborah Hall', price: 3405, status: 'success' },
      { order_no: 'fA599982-2C3a-0F55-8E28-3e7DCadCe12f', timestamp: 1229312695513, username: 'Larry Martin', price: 8966.2, status: 'success' }]
  },
  methods: {
  }
}
</script>
