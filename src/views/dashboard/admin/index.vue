<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart1></bar-chart1>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart2></bar-chart2>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}" :xl="{span: 6}" style="padding-right:8px;margin-bottom:30px;">
        <Customer-table></Customer-table>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <lable-table></lable-table>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 10}" :xl="{span: 10}" style="margin-bottom:30px;">
        <div class="chart-wrapper">
          <zrsale-card></zrsale-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
          <div style="float:right" id="date_ui"></div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { statisticsWeekInfo } from '@/api/statistics'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart1 from './components/BarChart1'
import BarChart2 from './components/BarChart2'
import CustomerTable from './components/CustomerTable'
import LableTable from './components/LableTable'
import ZrsaleCard from './components/ZrsaleCard'
import store from '@/store'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart1,
    BarChart2,
    CustomerTable,
    LableTable,
    ZrsaleCard
  },
  data() {
    return {
      data: {
        customer: {},
        goods: {},
        endOrder: {},
        message: {}
      },
      lineChartData: {}
    }
  },
  created() {
    this.statisticsWeekInfo()
    this.$nextTick(() => {
      laydate.render({
        elem: '#date_ui',
        position: 'static',
        btns: ['now'],
        calendar: true
      })
    })
  },
  methods: {
    statisticsWeekInfo() {
      statisticsWeekInfo().then(response => {
        if (response.code === 50001) {
          store.dispatch('GetRefreshToken').then(() => {
            this.statisticsWeekInfo()
          })
        }
        if (response.code === 200) {
          this.data = response.data
          this.lineChartData = this.data['customer']
        }
      }).catch(() => {
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = this.data[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
