<template>
  <el-row class="panel-group" :gutter="40">

    <el-col align="center" :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('customer')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="s1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日新增收入</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m1.price" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>

    <el-col align="center" :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('message')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日新增订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m2.count" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col align="center" :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('customer')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="s3" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日新增用户</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m3.count" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col align="center" :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('message')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="s2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">昨日访问量</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m4.count" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { zrStatus } from '@/api/statistics/statistics'
  import CountTo from 'vue-count-to'
  import store from '@/store'

  export default {
    components: {
      CountTo
    },
    data() {
      return {
        data: {
          m1: { price: 0 },
          m2: { count: 0 },
          m3: { count: 0 },
          m4: { count: 0 }
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        zrStatus().then(response => {
          if (response.code === 50001) {
            store.dispatch('GetRefreshToken').then(() => {
              this.getData()
            })
          }
          if (response.code === 200) {
            this.data = response.data
          }
        }).catch(() => {
        })
      },
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    padding-top: 10px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
  &:hover {
  }
  .icon-shoppingCard {
    color: #34bfa3
  }
  .card-panel-icon {
    /*float: left;*/
    font-size: 48px;
  }
  .card-panel-description {
    font-weight: bold;
  .card-panel-num {
    font-size: 20px;
  }
  }
  }
  }
</style>

