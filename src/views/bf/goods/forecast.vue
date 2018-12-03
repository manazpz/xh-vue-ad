<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <select-tree  class="filter-item" :options="options" v-model="brandId" :props="defaultProps"/>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
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
      <el-table-column align="center" label="商品名" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月份" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.month}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button  type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
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
      <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="商品名" prop="goodsId" class="postInfo-container-item">
          <select-tree v-model="temp.goodsId" :options="options" :props="defaultProps" >
          </select-tree>
        </el-form-item>
        <el-form-item label-width="110px" label="月份" prop="month" class="postInfo-container-item">
          <el-date-picker v-model="temp.month" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="价格"  prop="price" class="postInfo-container-item">
          <el-input  v-model="temp.price" placeholder="请输入价格"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增预测'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->
  </div>
</template>

<script>
  import { forecastList, getClassifyTree, createForecast, deleteForecast, updateForecast } from '@/api/goods/goods'
  import SelectTree from '@/components/widget/SelectTree.vue'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'forecast',
    inject: ['reload'],
    directives: {
      waves
    },
    components: {
      SelectTree
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        brandId: '',
        listLoading: false,
        btnLoading: false,
        dialogStatus: '',
        dialogFormVisible: false,
        msg: '',
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          status: undefined,
          model: '02'
        },
        types: {
          model: '02'
        },
        temp: {
          id: undefined,
          goodsId: '',
          month: '',
          price: 0
        },
        rule: {
          goodsId: [{ required: true, message: '商品名不能为空！', trigger: 'change' }],
          month: [{ required: true, message: '月份不能为空！', trigger: 'change' }],
          price: [{ required: true, message: '价格不能为空！', trigger: 'change' }]
        },
        // 默认选中值
        selected: 'A',
        // 数据默认字段
        defaultProps: {
          // 父级唯一标识
          parent: 'parentId',
          // 唯一标识
          value: 'id',
          // 标签显示
          label: 'label',
          // 子级
          children: 'children'
        },
        // 数据列表
        options: []
      }
    },
    created() {
      this.getList()
      this.getType()
    },
    methods: {
      getList() {
        this.listLoading = true
        forecastList(this.listQuery).then(response => {
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
      getType() {
        getClassifyTree(this.types).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getType()
            })
          }
          if (response.code === 200) {
            this.options = response.data.items
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
      resetTemp() {
        this.temp = {
          id: undefined,
          goodsId: '',
          month: '',
          price: 0
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增预测'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createForecast(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = '编辑预测'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateForecast(this.temp).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.reload()
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleDelete(row, isValid) {
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id }
          deleteForecast(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row, isValid)
              })
            }
            if (response.code === 200) {
              this.reload()
              this.listLoading = false
              this.dialogFormVisible = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              row.del = isValid
            }
          }).catch(() => {
            this.listLoading = false
          })
        }).catch(_ => {
          return
        })
      }
    }
  }
</script>
