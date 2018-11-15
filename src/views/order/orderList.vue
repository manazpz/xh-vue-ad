<template>
  <div class="app-container">

    <!-- 过滤条件 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" clearable
                placeholder="订单编号" v-model="listQuery.number">
      </el-input>
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.orderStatus" placeholder="订单状态">
        <el-option key="01" label="已完成" value="01">
        </el-option>
        <el-option key="02" label="已取消" value="02">
        </el-option>
        <el-option key="03" label="进行中" value="03">
        </el-option>
        <el-option key="04" label="售后中" value="04">
        </el-option>
      </el-select>
      <el-select clearable @change='handleFilter' style="width: 140px;" class="filter-item" v-model="listQuery.payStatus" placeholder="付款状态">
        <el-option key="01" label="未付款" value="01">
        </el-option>
        <el-option key="02" label="已付款" value="02">
        </el-option>
        <el-option key="03" label="已取消" value="03">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!-- 过滤条件 end -->

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all" ></el-tab-pane>
      <el-tab-pane label="待付款" name="dfk" ></el-tab-pane>
      <el-tab-pane label="代发货" name="dfh"></el-tab-pane>
      <el-tab-pane label="待收货" name="dsh"></el-tab-pane>
    </el-tabs>

    <!-- 表格 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100%;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :key='tableKey' :data="scope.row.goods" :show-header="false"  stripe border fit highlight-current-row
                    style="width: 100%;min-height:100%;">
            <el-table-column align="center" label="订单编号" width="100">
              <template slot-scope="prop">
                <span>{{prop.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="图片" width="150">
              <template slot-scope="prop">
                <img v-if="prop.row.imgs[0] != null" :src=" prop.row.imgs[0].url " style="width: 90px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column align="center" label="规格" min-width="150" :show-overflow-tooltip="true">
              <template slot-scope="prop">
                <span>{{prop.row.parameterStr}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="价格" width="70" :show-overflow-tooltip="true">
              <template slot-scope="prop">
                <span>￥{{prop.row.guJia}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" width="70" :show-overflow-tooltip="true">
              <template slot-scope="prop">
                <span>x1</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="70" :show-overflow-tooltip="true">
              <template slot-scope="prop">
                <span>{{prop.row.checkStatus | jcStatus}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单编号" min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买人" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.buyer}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="实付金额" min-width="90">
        <template slot-scope="scope">
          <span style="color:red">￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.payStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收/发货状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="检验状态" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.checkStatus | jcStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" min-width="90">
        <template slot-scope="scope">
          <span>{{scope.row.orderStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" min-width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success"
                     @click="handleDetail(scope.row.id)">查看详情
          </el-button>
          <!--<el-dropdown v-if="scope.row.orderStatus == '03'">-->
            <!--<el-button type="primary" >-->
              <!--{{$t('table.actions')}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
            <!--</el-button>-->
            <!--<el-dropdown-menu slot="dropdown">-->
              <!--<el-dropdown-item v-if="scope.row.price < 0 && scope.row.checkStatus === '02'" @click.native = "handleBtn(scope.row,'paystatus','02')">确定付款</el-dropdown-item>-->
              <!--<el-dropdown-item v-if="scope.row.deliveryStatus === '02' && scope.row.payStatus === '02'" @click.native = "handleInvoice(scope.row)">确定发货</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
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

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="发票抬头：" prop="title" class="postInfo-container-item">
          <el-input v-model="temp.title" required placeholder="请输入发票抬头"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="税号：" prop="duty" class="postInfo-container-item">
          <el-input v-model="temp.duty" required placeholder="请输入税号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="类型：" class="postInfo-container-item">
          <el-radio v-model="temp.type" label="01">个人</el-radio>
          <el-radio v-model="temp.type" label="02">公司</el-radio>
        </el-form-item>
        <el-form-item label-width="110px" label="内容：" prop="content" class="postInfo-container-item">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="temp.content">
          </el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="开票时间：" class="postInfo-container-item">
          <el-date-picker
            v-model="temp.createTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" v-loading="btnLoading" @click="createInvoice">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { orderList, updateOrder } from '@/api/order'
  import { insertOrder } from '@/api/invoice/invoice'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'orderList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        activeName: 'all',
        dialogFormVisible: false,
        btnLoading: false,
        dialogStatus: '',
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          number: '',
          orderStatus: '',
          deliveryStatus: '',
          payStatus: ''
        },
        temp: {
          id: undefined,
          title: '',
          duty: '',
          type: '',
          content: '',
          createTime: ''
        },
        rules: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        orderList(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.total = response.data.total
            this.list.forEach((k) => {
              switch (k.payStatus) {
                case '01' :
                  k.payStatusName = '未付款'
                  break
                case '02' :
                  k.payStatusName = '已付款'
                  break
                case '03' :
                  k.payStatusName = '已取消'
                  break
              }
              switch (k.orderStatus) {
                case '01' :
                  k.orderStatusName = '已完成'
                  break
                case '02' :
                  k.orderStatusName = '已取消'
                  break
                case '03' :
                  k.orderStatusName = '进行中'
                  break
                case '04' :
                  k.orderStatusName = '售后中'
                  break
              }
              switch (k.deliveryStatus) {
                case '01' :
                  k.deliveryStatusName = '已发货'
                  break
                case '02' :
                  k.deliveryStatusName = '未发货'
                  break
                case '03' :
                  k.deliveryStatusName = '已收货'
                  break
              }
            })
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
      handleDetail(row) {
        this.$router.push({ path: 'orderDetail', query: { id: row }})
      },
      handleClick(val) {
        this.listQuery = {
          pageNum: 1,
          pageSize: 20,
          deliveryStatus: '',
          payStatus: ''
        }
        switch (val.name) {
          case 'all':
            break
          case 'dfk':
            this.listQuery.payStatus = '01'
            break
          case 'dfh':
            this.listQuery.deliveryStatus = '02'
            break
          case 'dsh':
            this.listQuery.deliveryStatus = '01'
            break
        }
        this.getList()
      },
      handleBtn(row, key, val) {
        var req = { id: row.id }
        req[key] = val
        updateOrder(req).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handleBtn(row, key, val)
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
        })
      },
      handleInvoice(row) {
        if (row.price > 0) {
          this.temp.orderId = row.id
          this.temp.price = row.price
          this.dialogStatus = '填写发票'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      },
      createInvoice() {
        this.btnLoading = true
        insertOrder(this.temp).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.createInvoice()
            })
          }
          if (response.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.btnLoading = false
            this.dialogFormVisible = false
            this.getList()
          }
        }).catch(() => {

        })
      }
    }
  }
</script>
