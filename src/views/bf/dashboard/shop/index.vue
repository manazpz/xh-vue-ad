<template>
  <div class="dashboard-editor-container">

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <shop-info></shop-info>
    </el-row>

    <panel-group></panel-group>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <div class="chart-wrapper">
          <sale-group></sale-group>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 10}" :xl="{span: 10}" style="margin-bottom:30px;">
        <div class="chart-wrapper">
          <zrsale-card></zrsale-card>
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="padding-right:8px;margin-bottom:30px;">
        <div style="float:right" id="date_ui"></div>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  import PanelGroup from './components/PanelGroup'
  import ShopInfo from './components/ShopInfo'
  import ZrsaleCard from './components/ZrsaleCard'
  import SaleGroup from './components/SaleGroup'

  export default {
    name: 'dashboard-shop',
    components: {
      PanelGroup,
      ShopInfo,
      ZrsaleCard,
      SaleGroup
    },
    data() {
      return {
      }
    },
    created() {
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
