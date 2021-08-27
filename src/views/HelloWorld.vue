<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul class="charts-group">
      <li>
        <pie-echarts />
      </li>
      <li>
        <bar-echarts />
      </li>
    </ul>
  </div>
</template>

<script>
import pieEcharts from './pie-echarts'
import barEcharts from './bar-echarts'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '图表展示'
    }
  },
  components: {
    pieEcharts,
    barEcharts
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.charts-group {
  display: flex;
}
.charts-group li {
  flex: 1;
  height: 400px;
  list-style: none;
  border: 1px solid #ddd;
}
.charts-group li:nth-child(2n -1) {
  margin-right: 20px;
}
</style>