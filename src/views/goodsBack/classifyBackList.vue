<template>
  <div>
    <el-form :model="temp" ref="dataForm" label-width="100px" class="from-content bg-from">
      <div class="step1">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-card>
              <div slot="header" class="clearfix">
                <span>一级分类</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleCreate('0')">添加一级分类</el-button>
              </div>
              <el-table :key='0' :data="classifyCascades1" :row-class-name="tableRowClassName" :show-header="false"
                        :row-style="selectedHighlight1" @row-click="rowClick1" :header-cell-style="selectHeadStyle" @cell-mouse-enter="showOper" @cell-mouse-leave="displayOper">
                <el-table-column min-width="50">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column min-width="150">
                  <template slot-scope="scope" v-if="scope.row.showDropDown" style="display: inline-block">
                    <el-button-group style="float: right">
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row,'0')">编辑</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-delete" @click="handleDeleteClassify(scope.row)">删除</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <div slot="header" class="clearfix">
                <span>二级分类</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleCreate('1')">添加二级分类</el-button>
              </div>
              <el-table :data="classifyCascades2" :row-class-name="tableRowClassName" :show-header="false"
                        :row-style="selectedHighlight2" @row-click="rowClick2" :header-cell-style="selectHeadStyle" @cell-mouse-enter="showOper" @cell-mouse-leave="displayOper">
                <el-table-column>
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope" v-if="scope.row.showDropDown" style="display: inline-block">
                    <el-button-group style="float: right">
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row,'1')">编辑</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-delete" @click="handleDeleteClassify(scope.row)">删除</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card>
              <div slot="header" class="clearfix">
                <span>三级分类</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleCreate('2')">添加三级分类</el-button>
              </div>
              <el-table :data="classifyCascades3" :row-class-name="tableRowClassName" :show-header="false"
                        :row-style="selectedHighlight3" @row-click="rowClick3" :header-cell-style="selectHeadStyle" @cell-mouse-enter="showOper" @cell-mouse-leave="displayOper">
                <el-table-column min-width="50">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column min-width="200">
                  <template slot-scope="scope" v-if="scope.row.showDropDown" style="display: inline-block">
                    <el-button-group style="float: right" >
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleBrand(scope.row)">品牌</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleSpec(scope.row)">规格</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row,'2')">编辑</el-button>
                      <el-button size="mini" type="primary" icon="el-icon-delete" @click="handleDeleteClassify(scope.row)">删除</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>

      </div>
    </el-form>


    <!-- 弹出框 start -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form :rules="rule" ref="dataForm" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="分类名称"  prop="name" class="postInfo-container-item">
          <el-input v-model="temp.name" required placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <!--<el-form-item v-if="type" label-width="110px" label="分类属性"  prop="model" class="postInfo-container-item">-->
          <!--<el-select clearable  style="width: 100%;" class="filter-item" v-model="temp.model" required placeholder="请输入分类属性">-->
            <!--<el-option key="01" label="新机" value="01">-->
            <!--</el-option>-->
            <!--<el-option key="02" label="旧机" value="02">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label-width="110px" label="排序号"  prop="px" class="postInfo-container-item">
          <el-input v-model="temp.px" required placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="备注"   class="postInfo-container-item">
          <el-input  v-model="temp.remarks" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='新增分类'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

    <!-- 弹出框 start -->
    <el-dialog :title="dialogBrandStatus" :visible.sync="dialogBrandFormVisible">
      <el-form :rules="ruleBrand" ref="dataBrandForm" :model="tempBrands" label-position="left" label-width="150px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="已选品牌"  prop="name" class="postInfo-container-item">
          <el-select v-model="tempBrands.name" multiple placeholder="请选择">
            <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBrandFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="updateDataBrand">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->

    <!-- 弹出框 start -->
    <el-dialog :title="dialogSpecStatus" :visible.sync="dialogSpecFormVisible">
      <el-form :rules="ruleSpec" ref="dataSpecForm" :model="tempSpecs" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="已选规格"  prop="specId" class="postInfo-container-item">
          <el-select v-model="tempSpecs.specId" multiple placeholder="请选择">
            <el-option v-for="item in specOptions" :key="item.id" :label="item.specName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="updateDataSpec">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->


  </div>
</template>

<script>
  import { createClassify, getClassify, updateClassify, deleteClassify, brandList, specList, updateClassifyBrand } from '@/api/goods'
  import store from '@/store'
  export default {
    name: 'classifyBackList',
    inject: ['reload'],
    model: {
      prop: 'classify',
      event: 'classify'
    },
    props: {
      classify: ''
    },
    data() {
      return {
        falg: true,
        preStep: true,
        nextStep: false,
        publish: false,
        type: false,
        classifyId1: '',
        classifyId2: '',
        classifyModel1: '',
        classifyModel2: '',
        brandOptions: [],
        specOptions: [],
        classifyCascades: [],
        classifyCascades1: !this.classify ? [] : this.classify.history.classifyCascades1,
        classifyCascades2: !this.classify ? [] : this.classify.history.classifyCascades2,
        classifyCascades3: !this.classify ? [] : this.classify.history.classifyCascades3,
        isShow2: !this.classify ? false : this.classify.history.isShow2,
        isShow3: !this.classify ? false : this.classify.history.isShow3,
        getIndex1: !this.classify ? -1 : this.classify.history.getIndex1,
        getIndex2: !this.classify ? -1 : this.classify.history.getIndex2,
        getIndex3: !this.classify ? -1 : this.classify.history.getIndex3,
        step: 1,
        text: !this.classify ? '' : this.classify.history.text,
        dialogStatus: '',
        dialogFormVisible: false,
        dialogBrandStatus: '',
        dialogBrandFormVisible: false,
        dialogSpecStatus: '',
        dialogSpecFormVisible: false,
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        listQuery: {
          id: undefined,
          pageNum: 1,
          pageSize: 10,
          name: '',
          model: '',
          sort: 'lastCreateTime DESC'
        },
        temp: {
          id: undefined,
          name: '',
          remarks: ''
        },
        tempBrands: {
          id: '',
          brandId: [],
          index: '',
          name: []
        },
        tempSpecs: {
          id: '',
          specId: [],
          index: '',
          specName: []
        },
        rule: {
          name: [{ required: true, message: '分类名称不能为空', trigger: 'change' }],
          // model: [{ required: true, message: '分类属性不能为空', trigger: 'change' }],
          px: [{ required: true, message: '排序号不能为空', trigger: 'change' }]
        },
        ruleBrand: {
          name: [{ required: true, message: '已选品牌不能为空', trigger: 'change' }]
        },
        ruleSpec: {
          specId: [{ required: true, message: '已选规格不能为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.getClassifyCascade()
      this.getType()
    },
    methods: {
      getType() {
        brandList(this.listQuery).then(response => {
          if (!response.data.items) return
          this.brandOptions = response.data.items
        })
      },
      getClassifyCascade() {
        if (this.classifyCascades1.length < 1) {
          getClassify({ model: this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1] }).then(response => {
            for (var i = 0; i < response.data.items.length; i++) {
              response.data.items[i].showDropDown = false
              if (response.data.items[i].children.length > 0) {
                for (var s = 0; s < response.data.items[i].children.length; s++) {
                  response.data.items[i].children[s].showDropDown = false
                  if (response.data.items[i].children[s].children.length > 0) {
                    for (var z = 0; z < response.data.items[i].children[s].children.length; z++) {
                      response.data.items[i].children[s].children[z].showDropDown = false
                    }
                  }
                }
              }
            }
            this.classifyCascades1 = response.data.items
            if (this.classifyCascades1.length > 0) {
              this.classifyCascades2 = this.classifyCascades1[0].children
              if (this.classifyCascades2.length > 0) {
                this.classifyCascades3 = this.classifyCascades2[0].children
              }
            }
          })
        }
      },
      showOper(row) {
        row.showDropDown = true
        if (row.parameter !== null) {
          this.tempBrands.name = []
          this.tempSpecs.specId = []
          this.tempBrands.index = row.index
          this.tempSpecs.index = row.index
          if (row.parameter.brand !== undefined) {
            for (var i = 0; i < row.parameter.brand.length; i++) {
              this.tempBrands.name.push(row.parameter.brand[i].id)
            }
          }
          if (row.parameter.spec !== undefined) {
            for (var j = 0; j < row.parameter.spec.length; j++) {
              this.tempSpecs.specId.push(row.parameter.spec[j].id)
            }
          }
        }
      },
      displayOper(row) {
        row.showDropDown = false
        if (row.index !== this.tempBrands.index && row.index !== this.tempSpecs.index) {
          this.tempBrands.name = []
          this.tempSpecs.specId = []
        }
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          parentId: '',
          index: '',
          px: '',
          obligate: '01',
          model: this.$route.fullPath.split('/')[this.$route.fullPath.split('/').length - 1],
          name: '',
          remarks: ''
        }
      },
      handleBrand(row) {
        this.dialogBrandStatus = '绑定品牌'
        this.dialogBrandFormVisible = true
        this.tempBrands.id = row.id
        this.tempBrands.index = row.index
        this.$nextTick(() => {
          this.$refs['dataBrandForm'].clearValidate()
        })
      },
      updateDataBrand(row) {
        this.$refs['dataBrandForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateClassifyBrand(this.tempBrands).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.listLoading = false
                this.dialogBrandFormVisible = false
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
      handleSpec(row) {
        // this.resetSpecTemp()
        this.dialogSpecStatus = '绑定规格'
        this.dialogSpecFormVisible = true
        this.tempSpecs.id = row.id
        this.tempSpecs.index = row.index
        this.$nextTick(() => {
          this.$refs['dataSpecForm'].clearValidate()
        })
      },
      updateDataSpec(row) {
        this.$refs['dataSpecForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateClassifyBrand(this.tempSpecs).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateDataSpec()
                })
              }
              if (response.code === 200) {
                this.reload()
                this.listLoading = false
                this.dialogSpecFormVisible = false
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
      handleCreate(index) {
        this.resetTemp()
        if (index === '0') {
          this.type = true
        } else {
          this.type = false
        }
        this.temp.index = index
        if (index === '1') {
          if (this.classifyId1.length === 0) {
            this.$notify({
              title: '警告',
              message: '请选择上级分类',
              type: 'success',
              duration: 2000
            })
            return
          } else {
            this.dialogStatus = '新增分类'
            this.dialogFormVisible = true
            this.temp.parentId = this.classifyId1
          }
          // this.temp.model = this.classifyModel1
        }
        if (index === '2') {
          if (this.classifyId2.length === 0) {
            this.$notify({
              title: '警告',
              message: '请选择上级分类',
              type: 'success',
              duration: 2000
            })
            return
          } else {
            this.dialogStatus = '新增分类'
            this.dialogFormVisible = true
            this.temp.parentId = this.classifyId2
          }
          // this.temp.model = this.classifyModel2
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            createClassify(this.temp).then(response => {
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
      handleUpdate(row, index) {
        if (index === '0') {
          this.type = true
        } else {
          this.type = false
        }
        this.falg = false
        this.temp = Object.assign({}, row)
        this.dialogStatus = '编辑分类'
        this.dialogFormVisible = true
        this.temp.index = row.index
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.listLoading = true
            updateClassify(this.temp).then((response) => {
              if (response.code === 50001) {
                store.dispatch('GetRefreshToken').then(() => {
                  this.updateData()
                })
              }
              if (response.code === 200) {
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                this.reload()
              }
            })
          }
        })
      },
      handleDeleteClassify(row) {
        this.falg = false
        this.$confirm('您确定删除吗？').then(_ => {
          this.listLoading = true
          const params = { id: row.id }
          deleteClassify(params).then(response => {
            if (response.code === 50001) {
              store.dispatch('GetRefreshToken').then(() => {
                this.handleModifyStatus(row)
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
            }
          }).catch(() => {
            this.listLoading = false
            this.falg = true
          })
        }).catch(_ => {
          return
        })
      },
      handlePreStep() {
        this.step--
        this.goStep(this.step)
        // $('html,body').animate({scrollTop:0},500);
      },
      handleNextStep() {
        this.step++
        this.goStep(this.step)
        // $('html,body').animate({scrollTop:0},500);
      },
      goStep(n) {
        switch (n) {
          case 1 :
            this.preStep = false
            this.nextStep = true
            this.publish = false
            break
          case 2 :
            this.preStep = true
            this.nextStep = true
            this.publish = false
            break
          case 3 :
            this.preStep = true
            this.nextStep = false
            this.publish = true
            break
        }
      },
      selectHeadStyle({ row, column, rowIndex, columnIndex }) {
        return {
          'color': 'rgb(250, 195, 100',
          'font-size': '18px',
          'text-align': 'center'
        }
      },
      tableRowClassName({ row, rowIndex }) {
        row.index = rowIndex
      },
      selectedHighlight1({ row, rowIndex }) {
        if ((this.getIndex1) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      selectedHighlight2({ row, rowIndex }) {
        if ((this.getIndex2) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      selectedHighlight3({ row, rowIndex }) {
        if ((this.getIndex3) === rowIndex) {
          return {
            'background-color': 'rgb(250, 195, 100)'
          }
        }
      },
      rowClick1(row) {
        if (this.falg) {
          this.isShow2 = true
          this.classifyId1 = row.id
          this.classifyModel1 = row.model
          this.text = row.name
          this.getIndex1 = row.index
          this.classifyCascades2 = row.children
          this.$emit('classify', '')
          if (this.classifyCascades2.length > 0) {
            this.rowClick2(row.children[0])
          } else {
            this.classifyCascades3 = []
          }
        } else {
          this.falg = true
        }
      },
      rowClick2(row) {
        if (this.falg) {
          this.isShow3 = true
          this.classifyId2 = row.id
          this.classifyModel2 = row.model
          this.text = this.text.split('>')[0] + ' > ' + row.name
          this.getIndex2 = row.index
          this.classifyCascades3 = row.children
          this.$emit('classify', '')
          this.listQuery.name = row.name
          this.listQuery.model = row.model
          specList(this.listQuery).then(response => {
            if (!response.data.items) return
            this.specOptions = response.data.items
            this.listQuery.name = ''
            this.listQuery.model = ''
          })
        } else {
          this.falg = true
        }
      },
      sendHistoryData(row) {
        row.history = {}
        row.history.isShow2 = this.isShow2
        row.history.isShow3 = this.isShow3
        row.history.classifyCascades1 = this.classifyCascades1
        row.history.classifyCascades2 = this.classifyCascades2
        row.history.classifyCascades3 = this.classifyCascades3
        row.history.getIndex1 = this.getIndex1
        row.history.getIndex2 = this.getIndex2
        row.history.getIndex3 = this.getIndex3
        row.history.text = this.text
      },
      rowClick3(row) {
        this.Index3 = row.index
        this.text = this.text.split('>')[0] + ' > ' + this.text.split('>')[1] + ' > ' + row.name
        this.getIndex3 = row.index
        this.sendHistoryData(row)
        this.$emit('classify', row)
        this.listQuery.name = row.name
        this.listQuery.model = row.model
        specList(this.listQuery).then(response => {
          debugger
          if (!response.data.items) return
          this.specOptions = response.data.items
          this.listQuery.name = ''
          this.listQuery.model = ''
        })
      }
    }
  }
</script>

<style>
  .bg-from {
    background: #f8f8f8;
  }
  .from-content {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
    min-height: 100%;
  }
  .el-select {
    width: 400px;
  }
</style>
