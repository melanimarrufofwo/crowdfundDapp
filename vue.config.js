module.exports = {
    devServer: {
        proxy: {
            '/backend': {
                target: 'http://113.204.194.92:8031/', //源地址
                // target: 'http://192.168.1.107:8083/', //源地址
              changeOrigin: true, //改变源
              pathRewrite: {
                '^/backend': '' //路径重写
              },
            },
            '/eth': {
              target: 'https://beaconcha.in/api/v1/', //源地址
              // target: 'http://192.168.1.107:8083/', //源地址
            pathRewrite: {
              '^/eth': '' //路径重写
            }
          }
            
        },
    },
  }