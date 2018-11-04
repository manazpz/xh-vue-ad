<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('customer')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">全部订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m1.count" :duration="2600"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('message')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待付款订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m2.count" :duration="3000"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('endOrder')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待发货订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m3.count" :duration="3200"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('goods')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order3" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待收货订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m4.count" :duration="3600"></count-to>单
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('customer')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待评价订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m5.count" :duration="2600"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('message')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待处理退款订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m6.count" :duration="3000"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('endOrder')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已完成订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m7.count" :duration="3200"></count-to>单
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('goods')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="order3" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已取消订单</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data.m8.count" :duration="3600"></count-to>单
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { orderType } from '@/api/statistics/statistics'
import CountTo from 'vue-count-to'
import store from '@/store'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      data: {
        m1: { count: 0 },
        m2: { count: 0 },
        m3: { count: 0 },
        m4: { count: 0 },
        m5: { count: 0 },
        m6: { count: 0 },
        m7: { count: 0 },
        m8: { count: 0 }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      orderType().then(response => {
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
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
