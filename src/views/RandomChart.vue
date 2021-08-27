<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="main" style="width: 100%;height:400px;"></div>
    <button class="mx-auto mb-4 success" @click="sendEmail">Send Message</button>
  </div>
</template>

<script>

// import barEcharts from './bar-echarts'
import Email from '../utils/smtp' 
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '图表展示'
    }
  },
  mounted() {
    //引入
    var echarts = require('echarts');

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 绘制图表
    myChart.setOption({
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
    });
  },
  methods: {
    sendEmail(){
      // this.$LoadScript("https://smtpjs.com/v3/smtp.js")
      // .then((Email) => {
      //   console.log(Email);                                         //this Promise return nothing!!!
          Email.send({
              // Host : "smtp.tesra.io",
              // Username : " feedback@rosefin.tech",
              // Password : "Aa12345678",
              SecureToken: "5723bce0-defc-4968-872e-0ab0541af5da",
              To : 'feedback@rosefin.tech',
              From : "feedback@rosefin.tech",
              Subject : "this is my test",
              Body : "this is a test",
          }).then(
              message => alert(message)
          );
      // })
      // .catch(() => {
      // // Failed to fetch script
      // });

      },
  },
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