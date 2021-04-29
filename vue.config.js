module.exports = {
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {  //使用"/api"来代替"http://f.apiplus.c"
            target: 'http://113.204.194.86:8081/', //源地址
            //   target: 'http://192.168.1.107:8083/', //源地址
              // target: 'https://api.icad.pro:4430', // 打包部署之后的测试服地址
              changeOrigin: true, //改变源
              pathRewrite: {
                '^/api': '' //路径重写
              }
            }
        }
    },
  }