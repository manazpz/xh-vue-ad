<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                  placeholder="商品名称" v-model="listQuery.name" clearable>
        </el-input>
        <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.model" placeholder="分类">

          <el-option key="01" label="已完成" value="01">
          </el-option>
          <el-option key="02" label="已取消" value="02">
          </el-option>
          <el-option key="03" label="进行中" value="03">
          </el-option>
          <el-option key="04" label="售后中" value="04">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
          {{$t('table.search')}}
        </el-button>
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
          <span>{{scope.row.lastcreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" :label="$t('table.status')">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '01'">上架</span>
          <span v-if="scope.row.status === '02'">下架</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button size="mini" type="primary"
                     @click="handleStock(scope.row)">{{$t('table.stock')}}
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleXj(scope.row.id, '02')">{{$t('table.xj')}}
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

    <!-- 弹出框 start -->
    <el-dialog title="修改库存" :visible.sync="dialogStockVisible">
      <el-form ref="dataStock" :model="tempStock" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="当前库存" class="postInfo-container-item">
          <el-input v-model="tempStock.currentStock"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="可用库存" class="postInfo-container-item">
          <el-input v-model="tempStock.useableStock"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="updateStock">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->
  </div>
</template>

<script>
  import { goodsList, updateGoodsStock, upper_lower_goods } from '@/api/goods/goods'
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
        btnLoading: false,
        dialogStockVisible: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          isDel: 'Y',
          status: '01',
          name: undefined,
          model: this.$route.fullPath.split("/")[this.$route.fullPath.split("/").length-1]
        },
        tempStock: {
          id: undefined,
          currentStock: 0,
          useableStock: 0
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
      handleUpdate(val) {
      },
      handleXj(id, val) {
        this.$confirm('下架商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          const temp = { 'id': id, 'status': val }
          upper_lower_goods(temp).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleXj(val)
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
      handleStock(row) {
        this.tempStock = {
          id: row.stockId,
          currentStock: row.currentStock,
          useableStock: row.useableStock
        }
        this.dialogStockVisible = true
        this.$nextTick(() => {
          this.$refs['dataStock'].clearValidate()
        })
      },
      updateStock() {
        this.btnLoading = true
        updateGoodsStock(this.tempStock).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.updateStock()
            })
          }
          if (response.code === 200) {
            this.dialogStockVisible = false
            this.btnLoading = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getList()
          }
        }).catch(() => {
          this.btnLoading = false
        })
      }
    }
  }
</script>
