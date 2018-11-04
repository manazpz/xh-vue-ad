<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import { statisticsOrderTypeInfo } from '@/api/statistics'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import store from '@/store'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      statisticsOrderTypeInfo().then(response => {
        if (response.code === 50001) {
          store.dispatch('GetRefreshToken').then(() => {
            this.initChart()
          })
        }
        if (response.code === 200) {
          this.chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              left: 'center',
              bottom: '10',
              data: ['新机', '新机换购', '旧机']
            },
            calculable: true,
            series: [
              {
                name: '类型统计',
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '38%'],
                data: response.data.items,
                animationEasing: 'cubicInOut',
                animationDuration: 2600
              }
            ]
          })
        }
      }).catch(() => {
      })
    }
  }
}
</script>
