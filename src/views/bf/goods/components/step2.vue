<template>
  <div class="step2">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <div>
          <el-row :gutter="2">
            <el-col :span="4" align="middle">
              <div class="col-content bg-purple-col" >
                <label>基本信息</label>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="col-content bg-purple-col" >
                <el-form ref="dataForm" :model="temp" label-width="110px" style='margin-left:50px;'>
                  <el-form-item label="商品品类：" class="postInfo-container-item">
                    <label>{{info.classify.history.text}}</label>
                  </el-form-item>
                  <el-form-item label="商品品牌：" class="postInfo-container-item">
                    <el-select v-model="temp.brandId" filterable placeholder="请选择品牌">
                      <el-option
                        v-for="item in brands"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="4" align="middle">
              <div class="col-content bg-purple-col">
                <label>商品信息</label>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="col-content bg-purple-col">
                <el-form ref="dataForm" :model="temp" label-width="110px" style="margin-left:50px;">
                  <el-form-item label="商品名称：" class="postInfo-container-item">
                    <el-input style="width: 200px" v-model="temp.name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品编号：" class="postInfo-container-item">
                    <el-input style="width: 200px" v-model="temp.code"></el-input>
                  </el-form-item>
                  <el-form-item v-if="info.classify.model == '02'" label="基准价格：" class="postInfo-container-item">
                    <el-input style="width: 200px" v-model="temp.banPrice"></el-input>
                  </el-form-item>
                  <el-form-item label="单位：" class="postInfo-container-item">
                      <el-select v-model="temp.unit" placeholder="请选择品牌">
                        <el-option
                          v-for="item in units"
                          :key="item.keyWord"
                          :label="item.name"
                          :value="item.keyWord">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="库存：" class="postInfo-container-item">
                    <el-input style="width: 200px" :disabled="true" v-model="temp.stock"></el-input>
                  </el-form-item>
                  <el-form-item label="邮递类型：" class="postInfo-container-item">
                    <el-select v-model="temp.logistcs" placeholder="请选择分组">
                      <el-option key="01" label="卖家承担运费" value="01"></el-option>
                      <el-option key="02" label="买家承担运费" value="02"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="上传商品图片：" class="postInfo-container-item">
                      <el-upload
                        multiple
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList"
                        :on-success="handlePictureCardSuccess"
                        :on-remove="handleRemove">
                        <el-tooltip class="item" effect="light" content="请上传jpg/png格式,不大于2M的图片" placement="bottom" >
                          <i class="el-icon-plus"></i>
                        </el-tooltip>
                      </el-upload>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="4" align="middle">
              <div class="col-content bg-purple-col">
                <label>商品规格</label>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="col-content bg-purple-col">
                <el-form ref="dataForm" :model="temp" label-width="110px" style="margin-left:50px;">
                  <el-form-item label="选定规格：" class="postInfo-container-item">
                    <el-table :key='tableKey' :data="classifySpecs" v-loading="listLoading" border fit highlight-current-row
                              style="width:97%;height:100%;" :header-cell-style="{background:'#c0c0c0'}">
                      <el-table-column align="center" label="规格组" width="100">
                        <template slot-scope="scope">
                          <span>{{scope.row.name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="参数" min-width="200">
                        <template slot-scope="scope">
                          <el-checkbox-group v-model="checkedCities" @change="handleCheckAllChange" >
                            <el-checkbox v-for="item in scope.row.param" :label="item" :key="item.spec_sort" >{{item.spec_value_name}}</el-checkbox>
                          </el-checkbox-group>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item v-if="info.classify.model == '02'" label="设置规格：" class="postInfo-container-item">
                    <el-input
                      style="width:97%;"
                      prepend="基准价格："
                      v-model="temp.banPrice"
                      :disabled="true">
                      <template slot="prepend">基准价格:</template>
                    </el-input>
                    <el-table :key='tableKey' :data="temp.specParameter" border fit highlight-current-row :span-method="objectSpanMethod"
                              style="width:97%;height:100%;" :header-cell-style="{background:'#c0c0c0'}">
                        <el-table-column align="center" label="规格组" width="80">
                          <template slot-scope="scope">
                            {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="规格值" min-width="70">
                          <template slot-scope="scope">
                            {{scope.row.spec_value_name}}
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="修正值" width="100">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.correntPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="保底总价" width="130">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.minPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="封顶总价" width="100">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.cappedPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="提示类型" width="100">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.tipsType" placeholder="请选择">
                              <el-option key="01" label="不提示" value="01"></el-option>
                              <el-option key="02" label="文本" value="02"></el-option>
                              <el-option key="03" label="图片" value="02"></el-option>
                              <el-option key="04" label="上图下文" value="02"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="提示文字" width="100">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.tipsText"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="提示图片" width="100">
                          <template slot-scope="scope">
                            <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :before-upload="beforeAvatarUpload"
                              :on-success="handlePictureCardSuccess"
                              :on-remove="handleRemove">
                              <el-tooltip class="item" effect="light" content="请上传jpg/png格式,不大于2M的图片" placement="bottom" >
                                <el-button size="mini" type="primary">上传图片</el-button>
                              </el-tooltip>
                            </el-upload>
                          </template>
                        </el-table-column>
                    </el-table>
                  </el-form-item>

                  <el-form-item v-if="info.classify.model == '01' && temp.goodsSpec.length > 0" label="商品库存：" class="postInfo-container-item">
                    <el-button type="success" plain style="float: right;margin-right: 30px" @click="handleStandard">批量设置标准值</el-button>
                    <el-table :key='tableKey' :data="temp.goodsSpec" border fit highlight-current-row
                              style="width:97%;height:100%;" :header-cell-style="{background:'#c0c0c0'}">

                        <el-table-column align="center" v-for="(fruit,index) in temp.goodsSpec[0].spec" :label="fruit.name" mini-width="80">
                          <template slot-scope="scope">
                            {{scope.row.spec[index].spec_value_name}}
                          </template>
                        </el-table-column>

                      <el-table-column align="center" label="货号" width="100">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.code"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="重量" width="100">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.weight"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="库存" width="100">
                        <template slot-scope="scope">
                          <el-input @blur="changeStock" v-model="scope.row.stock"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="成本价" width="100">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.costPrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="价格（元）" width="100">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.price"></el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div>
          <Ueditor v-model="temp.parameter" :id="u1" :config="config1" ref="ueditor1"></Ueditor>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="three">
        <div>
          <Ueditor v-model="temp.detail" :id="u2" :config="config2" ref="ueditor2"></Ueditor>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出框 start -->
    <el-dialog title="设置标准值" :visible.sync="standardVisible">
      <el-form ref="dataStandard" :model="standard" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="110px" label="重量" class="postInfo-container-item">
          <el-input v-model="standard.weight"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="库存" class="postInfo-container-item">
          <el-input v-model="standard.stock"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="成本价" class="postInfo-container-item">
          <el-input v-model="standard.costPrice"></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="价格（元）" class="postInfo-container-item">
          <el-input v-model="standard.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="setStandard">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 end -->
  </div>
</template>
<script>
  import { brands, classifySpecParam } from '@/api/goods/goods'
  import { getConfig } from '@/api/user'
  import Ueditor from '@/components/Ueditor'

  export default {
    name: 'step1',
    components: { Ueditor },
    model: {
      prop: 'info',
      event: 'info'
    },
    props: {
      info: ''
    },
    data() {
      return {
        tableKey: 0,
        goodsId: '',
        listLoading: true,
        activeName: 'first',
        standardVisible: false,
        brands: [],
        units: [],
        fileList: [],
        u1: 'u1' + new Date(),
        u2: 'u2' + new Date(),
        classifySpecs: [],
        spanArr: [],
        checkedCities: [],
        pos: 0,
        temp: !this.info.info ? {
          id: undefined,
          logistcs: '01',
          name: '',
          code: new Date().getTime(),
          brandId: '',
          banPrice: '',
          unit: 'UP',
          stock: '0',
          specParameter: [],
          goodsSpec: [],
          parameter: '',
          detail: ''
        } : this.info.info,
        config1: {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '<table class="tm-tableAttr" width="789"><thead style="margin: 0px; padding: 0px; background-color: rgb(238, 238, 238); border-bottom: 1px solid rgb(228, 228, 228); font-weight: 700; font-size: 14px; color: rgb(153, 153, 153);"><tr style="margin: 0px; padding: 0px;" class="firstRow"><td colspan="2" style="margin: 0px; padding-right: 5px; padding-left: 20px; border-bottom-color: rgb(229, 229, 229);">[键入标题]</td></tr></thead><tbody style="margin: 0px; padding: 0px;"><tr class="tm-tableAttrSub" style="margin: 0px; padding: 0px;"><th colspan="2" style="margin: 0px; padding-right: 5px; padding-left: 20px; text-align: left; width: 763px; border-top-color: rgb(229, 229, 229); border-right-color: rgb(229, 229, 229);">[键入分组名]</th></tr><tr style="margin: 0px; padding: 0px;"><th style="margin: 0px; padding-right: 5px; padding-left: 20px; color: rgb(153, 153, 153); font-weight: 400; text-align: right; width: 147px; border-top-color: rgb(247, 247, 247); border-right-color: rgb(247, 247, 247);"><p></p><p>&nbsp; &nbsp; &nbsp;【参数名】</p></th><td style="margin: 0px; padding-right: 5px; padding-left: 5px; border-top-color: rgb(247, 247, 247);">【参数值】</td></tr></tbody></table>',
          autoClearinitialContent: false,
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: ''
        },
        config2: {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '',
          autoClearinitialContent: false,
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: ''
        },
        standard: {
          weight: 0,
          stock: 0,
          costPrice: 0,
          price: 0
        }
      }
    },
    mounted() {
      window.onbeforeunload = function(e) {
        e = e || window.event
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示'
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示'
      }
    },
    created() {
      this.info.data = this.temp
      if (this.info.data.specParameter.length > 0) {
        this.getSpanArr(this.info.data.specParameter)
      }
      this.getBrands()
      this.getUnits()
      this.getClassifySpecParam()
    },
    methods: {
      getBrands() {
        if (this.brands.length < 1) {
          brands().then(response => {
            this.brands = response.data.items
          })
        }
      },
      getUnits() {
        if (this.brands.length < 1) {
          getConfig({ type: '\'UNIT\'' }).then(response => {
            this.units = response.data.items
          })
        }
      },
      getClassifySpecParam() {
        if (this.classifySpecs.length < 1) {
          classifySpecParam(this.info.classify.id).then(response => {
            this.classifySpecs = response.data.items
            if (this.info.data.specParameter.length > 0) {
              var specParameter = this.info.data.specParameter
              for (var i = 0; i < specParameter.length; i++) {
                for (var j = 0; j < this.classifySpecs.length; j++) {
                  var param = this.classifySpecs[j].param
                  for (var z = 0; z < param.length; z++) {
                    if (specParameter[i].spec_value_name === param[z].spec_value_name &&
                      specParameter[i].spec_sort === param[z].spec_sort) {
                      this.checkedCities.push(param[z])
                    }
                  }
                }
              }
            }
            if (this.info.data.goodsSpec.length > 0) {
              var goodsSpec = this.info.data.goodsSpec
              for (var k = 0; k < goodsSpec.length; k++) {
                for (var l = 0; l < goodsSpec[k].spec.length; l++) {
                  var ls = goodsSpec[k].spec[l]
                  for (var n = 0; n < this.classifySpecs.length; n++) {
                    var gparam = this.classifySpecs[n].param
                    for (var m = 0; m < gparam.length; m++) {
                      if (ls.spec_value_name === gparam[m].spec_value_name &&
                        ls.spec_sort === gparam[m].spec_sort) {
                        this.checkedCities.push(gparam[m])
                      }
                    }
                  }
                }
              }
              var hash = {}
              this.checkedCities = this.checkedCities.reduce(function(item, next) {
                // hash[next.spec_sort] ? '' : hash[next.spec_sort] = true && item.push(next)
                hash[next.spec_sort] ? '' : (hash[next.spec_value_name] ? '' : hash[next.spec_value_name] = true && item.push(next))
                return item
              }, [])
            }
            this.listLoading = false
          })
        }
      },
      handleCheckAllChange(val) {
        if (this.info.classify.model === '01') {
          var data = this.formatSpecList(val)
          for (var i = 0; i < data.length; i++) {
            data[i].code = new Date().getTime() + i
            data[i].weight = '0'
            data[i].stock = '0'
            data[i].costPrice = '0'
            data[i].price = '0'
          }
          this.temp.goodsSpec = data
        }
        if (this.info.classify.model === '02') {
          val.sort(function(a, b) {
            return a.px - b.px
          })
          this.temp.specParameter = val
          this.getSpanArr(this.temp.specParameter)
        }
      },
      // 整理spec容器
      formatSpecList(val) {
        // 整理数据
        var arrs = []
        for (var i = 0; i < val.length; i++) {
          var flag = false
          if (arrs.length > 0) {
            for (var j = 0; j < arrs.length; j++) {
              for (var k = 0; k < arrs[j].length; k++) {
                if (arrs[j][k].id === val[i].id) {
                  arrs[j].push(this.formatSpec(val[i]))
                  flag = true
                  break
                }
              }
            }
            if (!flag) {
              var ls = []
              ls.push(this.formatSpec(val[i]))
              arrs.push(ls)
            }
          } else {
            var lss = []
            lss.push(this.formatSpec(val[i]))
            arrs.push(lss)
          }
        }
        // 划分数据
        var data = []
        if (arrs.length === 1) {
          for (var n = 0; n < arrs[0].length; n++) {
            var lsss = []
            lsss.push(arrs[0][n])
            data.push({ 'spec': lsss })
          }
        } else {
          var arr = this.hbArray(arrs[0], arrs[1])
          var index = 2
          while (true) {
            if (arrs[index]) {
              arr = this.hbArray(arr, arrs[index])
              index++
            } else {
              break
            }
          }
          for (var l = 0; l < arr.length; l++) {
            data.push({ 'spec': arr[l] })
          }
        }
        return data
      },
      hbArray(arr1, arr2) {
        var arr = []
        for (var i = 0; i < arr1.length; i++) {
          for (var j = 0; j < arr2.length; j++) {
            var ls = []
            if (arr1[i].length > 1) {
              for (var k = 0; k < arr1[i].length; k++) {
                ls.push(arr1[i][k])
              }
            } else {
              ls.push(arr1[i])
            }
            ls.push(arr2[j])
            arr.push(ls)
          }
        }
        return arr
      },
      formatSpec(data) {
        return {
          id: data.id,
          name: data.name,
          px: data.px,
          spec_sort: data.spec_sort,
          spec_value_name: data.spec_value_name
        }
      },
      getSpanArr(data) {
        this.spanArr = []
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1)
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].name === data[i - 1].name) {
              this.spanArr[this.pos] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.pos = i
            }
          }
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      handleStandard() {
        if (this.temp.goodsSpec.length < 1) {
          this.$notify({
            title: '提示',
            message: '请先选择规格',
            duration: 0
          })
        } else {
          this.standardVisible = true
          this.$nextTick(() => {
            this.$refs['dataStandard'].clearValidate()
          })
        }
      },
      setStandard() {
        var stock = 0
        for (var i = 0; i < this.temp.goodsSpec.length; i++) {
          this.temp.goodsSpec[i].weight = this.standard.weight
          this.temp.goodsSpec[i].stock = this.standard.stock
          this.temp.goodsSpec[i].costPrice = this.standard.costPrice
          this.temp.goodsSpec[i].price = this.standard.price
          stock = Number(stock) + Number(this.standard.stock)
        }
        this.temp.stock = stock
        this.standardVisible = false
      },
      changeStock(val) {
        var stock = 0
        for (var i = 0; i < this.temp.goodsSpec.length; i++) {
          stock = Number(stock) + Number(this.temp.goodsSpec[i].stock)
        }
        this.temp.stock = stock
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handlePictureCardSuccess(response, file, fileList) {
      },
      handleRemove(file, fileList) {
      }
    }
  }
</script>

<style>
  .step2 {
    background: #fff;padding: 10px;
  }
  .el-row {
    margin-bottom: 10px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .bg-purple-col {
    padding-bottom: 10px;
    background: #f8f8f8;
  }
  .col-content {
    padding-top: 20px;
    border-radius: 4px;
  }
  .spec-content {
    padding-top: 10px;
    padding-bottom: 5px;
    border-radius: 4px;
    min-height: 70px;
    background: #fff;
  }
  .spec-row-content {
    padding: 3px;
    border-radius: 4px;
    min-height: 10px;
    background: #f8f8f8;
  }
  .el-input.is-disabled .el-input__inner{
    color: #000000;
  }
</style>
