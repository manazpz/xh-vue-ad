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
      <step2 v-model="temp.detail" v-if="step === 2"></step2>
    </el-form>
    <div class="but-group">
      <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
      <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
      <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布商品</el-button>
    </div>
  </div>
</template>

<script>
  import { step1, step2, step3 } from './components'
  import { pushGoods } from '@/api/goods/goods'
  import store from '@/store'
  export default {
    name: 'editGoods',
    inject: ['reload'],
    data() {
      return {
        preStep: false,
        nextStep: true,
        publish: false,
        loading: false,
        test: '',
        step: 1,
        temp: {
          id: undefined,
          classify: undefined,
          detail: {}
        }
      }
    },
    components: {
      step1,
      step2,
      step3
    },
    methods: {
      handlePreStep() {
        this.step--
        this.goStep(this.step)
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
        // this.loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        pushGoods(this.temp.detail).then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getList()
            })
          }
          if (response.code === 200) {
            debugger
            setTimeout(() => {
              this.loading = false
            }, 1.5 * 1000)
          }
        }).catch(() => {
          this.listLoading = false
        })
        // pushGoods
        // this.reload()
        // this.step++
        // this.goStep(this.step)
      },
      goStep(n) {
        switch (n) {
          case 1 :
            this.preStep = false
            this.nextStep = true
            this.publish = false
            break
          case 2 :
            this.temp.detail = {}
            this.temp.detail.classify = this.temp.classify
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
