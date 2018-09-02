<template>
  <div class="app-container">
    <el-card class="box-card" v-loading="listLoading" :key='tableKey' :data="list">
      <div slot="header" class="clearfix">
        <span>一级分类</span>
        <el-button style="float: right; padding: 8px 16px" type="primary" v-waves @click.native="addClassify('first')">新增</el-button>
      </div>
      <!--<el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row-->
                <!--style="width: 100%;min-height:100%;">-->
        <!--<el-table-column align="center" label="序号" width="60">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.$index+1}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="名称" width="380">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.name}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <div v-for="item in list" class="text item">
        {{ item.name }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>二级分类</span>
        <el-button style="float: right; padding: 8px 16px" type="primary" v-waves @click.native="addClassify">新增</el-button>
      </div>
      <div v-for="item in list" class="text item">
        <div v-for="item in item.secondClassify" class="text item">
          {{ item.name }}
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>三级分类</span>
        <el-button style="float: right; padding: 8px 16px" type="primary" v-waves @click.native="addClassify">新增</el-button>
      </div>
      <div v-for="item in list" class="text item">
        <div v-for="item in item.secondClassify" class="text item">
          <div v-for="item in item.third" class="text item">
            {{ item.name }}
          </div>
        </div>
      </div>
    </el-card>


  <!-- 弹出框 start -->
  <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
    <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
             style='width: 400px; margin-left:50px;'>
      <el-form-item label-width="110px" label="分类名称"  prop="name" class="postInfo-container-item">
        <el-input v-model="temp.name" required placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label-width="110px" label="分类排序"  prop="sort" class="postInfo-container-item">
        <el-input v-model="temp.sort" required placeholder="请输入分类排序"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
      <el-button type="primary" v-loading="btnLoading" @click="createData">{{$t('table.confirm')}}</el-button>
    </div>
  </el-dialog>
  <!-- 弹出框 end -->

  </div>
</template>


<script>
  import { getClassify } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import store from '@/store'

  export default {
    name: 'classifyBackList',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        listSecond: [],
        listThird: [],
        total: null,
        listLoading: true,
        btnLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          name: '',
          sort: '',
          status: 'published'
        },
        rule: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getClassify(this.listQuery).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            this.list = response.data.items
            this.list.forEach(function(c) {
              this.listSecond = c.secondClassify
            })
            this.listSecond.forEach(function(c) {
              this.listThird = c.third
            })
            debugger
            this.total = response.data.total
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: '',
          sort: '',
          type: '',
          status: 'published'
        }
      },
      addClassify(val) {
        this.resetTemp()
        this.temp.type = val
        this.dialogStatus = '新增分类'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            // createContract(this.temp).then(response => {
            //   if (response.code === 50001) {
            //     store.dispatch('GetRefreshToken').then(() => {
            //       this.createData()
            //     })
            //   }
            //   if (response.code === 200) {
            //     this.reload()
            //     this.dialogFormVisible = false
            //     this.$notify({
            //       title: '成功',
            //       message: '创建成功',
            //       type: 'success',
            //       duration: 2000
            //     })
            //   }
            // })
          }
        })
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
