<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button type="success" size="mini" @click="handleCreate" class="filter-item" round>新增优惠券</el-button>
      <div style="float: right;">
        <label class="filter-item">分类：</label>
        <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="优惠券分类">
          <el-option v-for="item in  typeOptions" :key="item.keyWord" :label="item.name"
                     :value="item.keyWord">
          </el-option>
        </el-select>
        <!--<label class="filter-item">审核状态：</label>-->
        <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.obligate1" placeholder="审核状态">-->
          <!--<el-option key="Y" label="通过" value="Y">-->
          <!--</el-option>-->
          <!--<el-option key="N" label="未通过" value="N">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" size="mini" @click="handleFilter">
          {{$t('table.search')}}
        </el-button>
      </div>
    </div>

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column align="center" :label="$t('table.no')" width="100">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="限领数" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.limitNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="限领条件" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.receiveTrem}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效期" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.beginTime+' 至 '+scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="70">
        <template slot-scope="scope">
          <span>{{scope.row.status | sxStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.obligate1 == 'Y'">已审核</span>
          <span v-if="scope.row.obligate1 == 'N'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleUpdate(scope.row)">{{$t('table.edit')}}
          </el-button>
          <el-button v-if="scope.row.status === '02'" size="mini" type="warning"
                     @click="sxj(scope.row,'01')">上架
          </el-button>
          <el-button v-else size="mini" type="info"
                     @click="sxj(scope.row,'02')">下架
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleModifyStatus(scope.row.id)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页组件 start -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 分页组件 end -->

    <!-- 编辑弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" >
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="120px"
               style='width: 600px; margin-left:40px;'>
        <el-form-item label-width="120px" label="标题" prop="title" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="描述" prop="content" class="postInfo-container-item">
          <el-input  v-model="temp.content" required placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="价格" prop="price" class="postInfo-container-item">
          <el-input  v-model="temp.price" required placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="数量" prop="num" class="postInfo-container-item">
          <el-input  v-model="temp.num" required placeholder="请输入库存"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="限领数" prop="num" class="postInfo-container-item">
          <el-input  v-model="temp.limitNum" required placeholder="例如：1，每人限领1张"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="领取条件" prop="receiveTrem" class="postInfo-container-item">
          <el-input  v-model="temp.receiveTrem" required placeholder="列如：100，订单满100可领取"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="有效期" prop="receiveTrem" class="postInfo-container-item">
          <el-date-picker
            ref="picker"
            v-model="temp.yxq"
            :editable="false"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="120px" label="类型" prop="type" class="postInfo-container-item">
          <el-select v-model="temp.type" style="width: 200px" >
            <el-option v-for="item in  typeOptions" :key="item.keyWord" :label="item.name"
                       :value="item.keyWord">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px" label="状态" prop="status" class="postInfo-container-item">
          <el-select style="width: 200px;" class="filter-item" v-model="temp.status">
            </el-option>
            <el-option key="01" label="上架" value="01">
            </el-option>
            <el-option key="02" label="下架" value="02">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增优惠券'" type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" v-loading="btnLoading" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->

  </div>
</template>

<script>
  import { getConfig } from '@/api/user'
  import { couponList, insertCoupon, updateCoupon, deleteCoupon } from '@/api/coupon/coupon'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'coupon',
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
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          type: '',
          obligate1: ''
        },
        temp: {
          id: undefined,
          title: '',
          content: '',
          price: '',
          num: '',
          limitNum: '',
          yxq: '',
          receiveTrem: null,
          type: '',
          status: '02'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        typeOptions: [],
        rules: {
        }
      }
    },
    created() {
      this.getType()
      this.getList()
    },
    methods: {
      getType() {
        getConfig({ type: '\'COUPON\'' }).then(response => {
          this.typeOptions = response.data.items
        })
      },
      getList() {
        this.listLoading = true
        couponList(this.listQuery).then(response => {
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
      handleModifyStatus(id) {
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteCoupon({ id: id }).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(id)
              })
            }
            if (response.code === 200) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.listLoading = false
            }
          }).catch(() => {
            this.listLoading = false
          })
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          title: '',
          content: '',
          price: '',
          num: '',
          limitNum: '',
          yxq: '',
          receiveTrem: null,
          type: '',
          status: '02'
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = '新增优惠券'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            insertCoupon(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.createData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.btnLoading = false
            })
          }
        })
      },
      handleUpdate(row) {
        if (row.beginTime !== '' && row.beginTime !== null && row.beginTime !== undefined &&
          row.endTime !== '' && row.endTime !== null && row.endTime !== undefined) {
          row.yxq = [new Date(row.beginTime), new Date(row.endTime)]
        }
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = '更新优惠券'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            updateCoupon(this.temp).then(response => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.getList()
                this.btnLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.btnLoading = false
            })
          }
        })
      },
      sxj(item, val) {
        if (item.obligate1 === 'N') {
          this.$message({
            message: '优惠券处于审核状态，请等待审核通过',
            type: 'warning'
          })
        } else {
          updateCoupon({ id: item.id, status: val, obligate1: 'Y' }).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.updateData()
              })
            }
            if (response.code === 200) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
            }
          }).catch(() => {
          })
        }
      }
    }
  }
</script>
