<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.model" placeholder="分类">
        <el-option key="01" label="新机" value="01">
        </el-option>
        <el-option key="02" label="旧机" value="02">
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
          <span>{{scope.row.lastCreateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="分类">
        <template slot-scope="scope">
          <span v-if="scope.row.model === '01'">新机</span>
          <span v-if="scope.row.model === '02'">旧机</span>
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

    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rule" :model="temp" ref="dataForm" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="审批" class="postInfo-container-item">
          <el-switch v-model="temp.choice" active-text="同意" inactive-text="拒绝" ></el-switch>
        </el-form-item>
        <el-form-item v-if="temp.choice === false " label-width="110px" label="拒绝原因"  prop="msg" class="postInfo-container-item">
          <el-input v-model="temp.msg" type="textarea" :rows="7" required></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

  </div>
</template>

<script>
  import { goodsList, goodsDelete, updateGoods } from '@/api/goods'
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
        dialogStatus: '',
        dialogFormVisible: false,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          isDel: 'N',
          obligate1: 'N'
        },
        rule: {
          msg: [{ required: true, message: '审核意见不能为空！', trigger: 'change' }]
        },
        temp: {
          id: undefined,
          msg: '',
          choice: false
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
      handleDel(id) {
        this.$confirm('删除审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          goodsDelete({ 'id': id }).then(response => {
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
        this.dialogStatus = '审核'
        this.dialogFormVisible = true
        this.temp.id = row.id
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData(row) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('审核商品，是否通过？').then(_ => {
              updateGoods(this.temp).then(response => {
                if (response.code === 50001) {
                  store.dispatch('GetRefreshToken').then(() => {
                    this.createData(row)
                  })
                }
                if (response.code === 200) {
                  this.dialogFormVisible = false
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  })
                  this.getList()
                }
              }).catch(() => {
                this.listLoading = false
              })
            }).catch(_ => {
              return
            })
          }
        })
      }
    }
  }
</script>
