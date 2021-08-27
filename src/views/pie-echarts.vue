<template>
  <div>
    <chart :options="chartPieData" auto-resize ref="chartPie" :style="{width: '100%'}"></chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
export default {
  data () {
    return {
      chartPieData: {
        series : [
            {
                name: '访问来源',
                type: 'pie',    // 设置图表类型为饼图
                radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                data:[          // 数据数组，name 为数据项名称，value 为数据项值
                    {value:235, name:'视频广告'},
                    {value:274, name:'联盟广告'},
                    {value:310, name:'邮件营销'},
                    {value:335, name:'直接访问'},
                    {value:400, name:'搜索引擎'}
                ]
            }
        ]
        }
    }
  },
  methods: {
    // 重置图表大小
    chartResize () {
      window.setTimeout(() => {
        this.$refs.chartPie.resize()
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