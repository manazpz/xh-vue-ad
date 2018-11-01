<template>
  <div class="app-container">

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编号" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.no}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="店名" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110">
        <template slot-scope="scope">
          <img v-if="scope.row.img != null" :src=" scope.row.img " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="店主" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.lastCreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"
                     @click="handleSh(scope.row)">{{$t('table.sh')}}
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleDel(scope.row.id)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->
  </div>
</template>

<script>
  import { shopList, shopDelete, shopUpdate } from '@/api/shop'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'reviewShopList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: '02'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        shopList(this.listQuery).then(response => {
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
      handleDel(id) {
        this.$confirm('删除审核店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          shopDelete({ 'id': id }).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleDel(id)
              })
            }
            if (response.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getList()
            }
          }).catch(() => {
            this.listLoading = false
          })
          return true
        })
      },
      handleSh(row) {
        shopUpdate({ shop: { id: row.id, status: '01', isOnOff: 'ON' }, user: { id: row.userId, status: 'SD' }}).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleSh(row)
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getList()
          }
        }).catch(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>
