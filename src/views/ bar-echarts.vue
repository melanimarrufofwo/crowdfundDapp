<template>
  <div>
    <chart :options="chartBarData" auto-resize ref="chartBar" :style="{width: '100%'}"></chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
export default {
  data () {
    return {
      chartBarData: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },
  methods: {
    // 重置图表大小
    chartResize () {
      window.setTimeout(() => {
        this.$refs.chartBar.resize()
      }, 60)
    }
  },
  mounted () {
    window.addEventListener('resize', this.chartResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.chartResize)
  },
  components: {
    chart: ECharts
  }
}
</script>

<style scoped>
</style>