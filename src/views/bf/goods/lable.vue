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
      <el-table-column align="center" label="标签名称" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签值" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" v-loading="btnLoading" @click="goodsDialog(scope.row)">添加标签商品</el-button>
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

    <!-- 编辑弹出框 start -->
    <el-dialog title="添加标签商品" :visible.sync="dialogFormVisible">
      <el-transfer
        v-model="goodss"
        filterable
        :titles="['未选商品', '已选商品']"
        :filter-method="filterMethod"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :data="goods">
      </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="addGoodsLable">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->
  </div>
</template>

<script>
  import { lables, goodsList, addGoodsLable } from '@/api/goods/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'lable',
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
        dialogFormVisible: false,
        lableId: '',
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        goods: [],
        goodss: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        lables(this.listQuery).then(response => {
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
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1
      },
      goodsDialog(row) {
        this.lableId = row.id
        this.btnLoading = true
        goodsList({ noLable: this.lableId, pageSize: 1000 }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.goodsDialog()
            })
          }
          if (response.code === 200) {
            this.goods = response.data.items
            this.goods.forEach(obj => {
              if (obj.model === '01') {
                obj.name = obj.name + '（新品）'
              }
              if (obj.model === '02') {
                obj.name = obj.name + '（旧品）'
              }
            })
            this.btnLoading = false
            this.dialogFormVisible = true
          }
        }).catch(() => {
          this.btnLoading = false
        })
      },
      addGoodsLable() {
        this.btnLoading = true
        addGoodsLable({ 'goodsIds': this.goodss, 'lableId': this.lableId }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.batchUpdateGoods()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.btnLoading = false
            this.dialogFormVisible = false
          }
        }).catch(() => {
          this.btnLoading = false
        })
      }
    }
  }
</script>
