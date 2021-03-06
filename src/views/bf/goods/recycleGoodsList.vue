<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <div style="float: right;">
        <label class="filter-item">商品名：</label>
        <el-input clearable v-model="listQuery.name" style="width: 140px;" @change='handleFilter' class="filter-item" placeholder="请输入商品名"></el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
          {{$t('table.search')}}
        </el-button>
      </div>

    </div>
    <!-- 过滤条件 end -->

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110">
        <template slot-scope="scope">
          <img v-if="scope.row.afileList[0] != null" :src=" scope.row.afileList[0].url " style="width: 90px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="120">
        <template slot-scope="scope">
          <span>￥{{scope.row.banPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.currentStock}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="可用库存" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.useableStock}}</span>
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
          <el-button size="mini" type="success"
                     @click="handleDeleteRecovery(scope.row.id)">{{$t('table.recovery')}}
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleDelete(scope.row.id)">{{$t('table.delete')}}
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
  import { goodsList, warehouseGoodsDeleteRecovery, goodsDelete } from '@/api/goods/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'sellGoodsList',
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
          isDel: 'Y',
          name: undefined,
          model: undefined
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        goodsList(this.listQuery).then(response => {
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
      handleDeleteRecovery(id) {
        this.$confirm('恢复商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          const temp = { 'id': id, 'isDelete': 'Y' }
          warehouseGoodsDeleteRecovery(temp).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleDeleteRecovery(id)
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
      handleDelete(id) {
        this.$confirm('此删除商品数据将会丢失, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          const temp = { 'id': id }
          goodsDelete(temp).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleDelete(id)
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
      }
    }
  }
</script>
