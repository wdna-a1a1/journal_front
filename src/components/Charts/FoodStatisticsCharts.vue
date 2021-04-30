<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>
<script>
import * as echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 2000
export default {
  name: 'FoodStatisticsBarCharts',
  mixins: [resize],
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
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
    },
    chartsType: {
      type: String,
    }
  },
  data () {
    return {
      chart: null,
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {

      echarts.dispose(this.$el)
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({

        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.chartData[0],
          axisTick: {
            alignWithLabel: true
          },
        }],
        yAxis: [{
          type: 'value',
          max: function (value) {
            return value.max + 5
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '数量:',
          type: this.chartsType,
          stack: 'vistors',
          barMaxWidth: 100,
          label: {
            show: true,
            position: 'top',
            fontSize: 24
          },
          itemStyle: {
            normal: {
              // 定制显示（按顺序）
              color: function (params) {
                var colorList = ['#409EFF', '#007192', '#975cd4', '#49bb9d',
                  '#fc781f', '#c8e2f8', '#fa705d', '#054437',
                  '#6d793b', '#F9E79F', '#BA4A00', '#ECF0F1',
                  '#616A6B', '#EAF2F8', '#4A235A', '#3498DB']
                return colorList[params.dataIndex]
              }
            },
          },
          data: this.chartData[1],
          animationDuration
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
