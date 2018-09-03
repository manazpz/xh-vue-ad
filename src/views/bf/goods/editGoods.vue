<template>
  <div>
    <el-steps align-center :active="step" style="margin-top: 10px">
      <el-step title="选择商品品类" description="">
      </el-step>
      <el-step title="编辑基本信息" description="">
      </el-step>
      <el-step title="完成" description="">
      </el-step>
    </el-steps>
    <el-form :model="temp" ref="dataForm" label-width="100px" class="from-content bg-from">
      <step1 v-model="temp.classify" v-if="step === 1"></step1>
      <step2 v-model="temp.info" v-if="step === 2"></step2>
      <step3 v-if="step === 3"></step3>
    </el-form>
    <div class="but-group" style="float: right;margin-right: 10px">
      <el-button @click.native.prevent="handlePreStep" v-show="preStep"  >上一步</el-button>
      <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary" >下一步</el-button>
      <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary" >发布商品</el-button>
    </div>
  </div>
</template>

<script>
  import { step1, step2, step3 } from './components'
  import { pushGoods, goodsList, goodsClassifyCascade } from '@/api/goods/goods'
  import store from '@/store'
  export default {
    name: 'editGoods',
    data() {
      return {
        goodsId: '',
        preStep: false,
        nextStep: true,
        publish: false,
        loading: false,
        test: '',
        step: 1,
        temp: {
          id: undefined,
          classify: undefined,
          detail: undefined,
          info: undefined
        }
      }
    },
    components: {
      step1,
      step2,
      step3
    },
    watch: {
      $route(to, from) {
        if (to.path === '/bf/gm/editGoods') {
          if (to.query.goodsId !== this.goodsId) {
            this.goodsId = to.query.goodsId
            this.initdata()
          }
        }
      }
    },
    created() {
      if (this.$route.path === '/bf/gm/editGoods') {
        if (this.$route.query.goodsId !== this.goodsId) {
          this.goodsId = this.$route.query.goodsId
          this.initdata()
        }
      }
    },
    methods: {
      initdata() {
        if (this.goodsId !== '' && this.goodsId !== undefined) {
          this.step = 0
          this.getGoodsClassifyCascade()
        }
      },
      getGoodsClassifyCascade() {
        goodsClassifyCascade(this.goodsId).then(response => {
          this.temp.classify = response.data
          this.getGoods()
        })
      },
      getGoods() {
        goodsList({ 'id': this.goodsId }).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getGoods()
            })
          }
          if (response.code === 200 && response.data.items.length > 0) {
            var goods = response.data.items[0]
            goods.stock = goods.useableStock
            this.temp.detail = goods
            this.step = 2
            this.goStep(this.step)
          }
        })
      },
      handlePreStep() {
        this.$confirm('此操作将丢失当前页数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.step--
          this.goStep(this.step)
        })
      },
      handleNextStep() {
        if (this.temp.classify === '' && this.step === 1) {
          this.$message.error('三级分类不能为空!')
          return
        }
        this.step++
        this.goStep(this.step)
      },
      handlePublish() {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        pushGoods(this.temp.info).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.handlePublish()
            })
          }
          if (response.code === 200) {
            setTimeout(() => {
              this.loading.close()
              this.step++
              this.goStep(this.step)
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.loading.close()
        })
      },
      goStep(n) {
        switch (n) {
          case 1 :
            this.preStep = false
            this.nextStep = true
            this.publish = false
            break
          case 2 :
            this.temp.info = {}
            this.temp.info.classify = this.temp.classify
            if (this.temp.detail !== undefined) {
              this.temp.info.info = this.frmatData(this.temp.detail)
            }
            this.preStep = true
            this.nextStep = false
            this.publish = true
            break
          case 3 :
            this.preStep = false
            this.nextStep = false
            this.publish = false
            break
        }
      },
      frmatData(data) {
        var dateil = {}
        var param = []
        dateil.id = data.id
        dateil.model = data.model
        dateil.logistcs = data.logistcs
        dateil.name = data.name
        dateil.code = data.code
        dateil.brandId = data.brandId
        dateil.banPrice = data.banPrice
        dateil.unit = data.unit
        dateil.stock = data.stock
        for (var i = 0; i < data.specParameter.length; i++) {
          var id = data.specParameter[i].id
          var name = data.specParameter[i].name
          var px = data.specParameter[i].px
          var parameter = data.specParameter[i].parameter
          for (var j = 0; j < parameter.length; j++) {
            parameter[j].id = id
            parameter[j].spec_value_name = parameter[j].name
            parameter[j].name = name
            parameter[j].spec_sort = parameter[j].value
            parameter[j].px = px
            param.push(parameter[j])
          }
        }
        dateil.specParameter = param
        dateil.parameter = data.parameter
        dateil.detail = data.detail
        return dateil
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
</style>
