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
                  <el-form-item label="商品分类：" class="postInfo-container-item">
                    <el-select v-model="temp.model" placeholder="请选择分组">
                      <el-option key="01" label="新机" value="01"></el-option>
                      <el-option key="02" label="旧机" value="02"></el-option>
                    </el-select>
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
                  <el-form-item label="基准价格：" class="postInfo-container-item">
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
                    <el-input style="width: 200px" :disabled="!!info.info" v-model="temp.stock"></el-input>
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
                    <el-table :key='tableKey' :data="classifySpecParam" v-loading="listLoading" border fit highlight-current-row
                              style="width:97%;height:100%;" :header-cell-style="{background:'#c0c0c0'}">
                      <el-table-column align="center" label="规格组" width="100">
                        <template slot-scope="scope">
                          <span>{{scope.row.name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="参数" min-width="200">
                        <template slot-scope="scope">
                          <el-checkbox-group v-model="checkedCities" @change="handleCheckAllChange" >
                            <el-checkbox v-for="item in scope.row.param"  :label="item" :key="item.spec_sort" >{{item.spec_value_name}}</el-checkbox>
                          </el-checkbox-group>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item label="设置规格：" class="postInfo-container-item">
                    <el-input
                      style="width:97%;"
                      prepend="基准价格："
                      v-model="temp.banPrice"
                      :disabled="true">
                      <template slot="prepend">基准价格:</template>
                    </el-input>
                    <el-table :key='tableKey' :data="temp.specParameter" border fit highlight-current-row :span-method="objectSpanMethod"
                              style="width:97%;height:100%;" :header-cell-style="{background:'#c0c0c0'}">
                        <el-table-column align="center" label="规格组" width="100">
                          <template slot-scope="scope">
                            {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="规格值" min-width="80">
                          <template slot-scope="scope">
                            {{scope.row.spec_value_name}}
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="修正值" width="110">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.correntPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="保底总价" width="110">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.minPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="封顶总价" width="140">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.cappedPrice"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="提示类型" width="130">
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
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div>
          <Ueditor v-model="temp.parameter" id="u1" :config="config1" ref="ueditor1"></Ueditor>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="three">
        <div>
          <Ueditor1 v-model="temp.detail" id="u2" :config="config2" ref="ueditor2"></Ueditor1>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import { brands, classifySpecParam } from '@/api/goods/goods'
  import { getConfig } from '@/api/user'
  import Ueditor from '@/components/Ueditor'
  import Ueditor1 from '@/components/Ueditor'

  export default {
    name: 'step1',
    components: { Ueditor, Ueditor1 },
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
        brands: [],
        units: [],
        fileList: [],
        classifySpecParam: [],
        spanArr: [],
        checkedCities: [],
        pos: 0,
        temp: !this.info.info ? {
          id: undefined,
          model: '01',
          logistcs: '01',
          name: '',
          code: '',
          brandId: '',
          banPrice: '',
          unit: 'UP',
          stock: '0',
          specParameter: [],
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
        this.checkedCities = this.info.data.specParameter
        for (var i = 0; i < this.checkedCities.length; i++) {
          delete this.checkedCities[i].value
        }
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
        if (this.classifySpecParam.length < 1) {
          classifySpecParam(this.info.classify.id).then(response => {
            this.classifySpecParam = response.data.items
            this.listLoading = false
          })
        }
      },
      handleCheckAllChange(val) {
        val.sort(function(a, b) {
          return a.px - b.px
        })
        this.temp.specParameter = val
        this.getSpanArr(this.temp.specParameter)
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
