<template>
<div class="content">
  <h3> 新书众筹</h3>
  <span>以最低的价格获取我的新书 </span>

  <!-- 众筹的总体状态  -->
  <div class="status">
    <div >众筹目标：<b>{{ target }} ETH </b></div>
    <div v-if="!closed">已众筹资金：
      <b>{{ total }} ETH </b>
      <button :disabled="closed" @click="crowdList">众筹名单</button>
    </div>
    <div v-if="closed"> 众筹已完成 </div>
    <div>众筹截止时间：{{ endDate }}</div>
  </div>

  <!-- 当读者参与过，显示如下div  -->
  <div v-if="joined" class="card-bkg">
    <div class="award-des">
      <span> 参与金额: </span>
      <b> {{ joinPrice }} ETH </b>
      <button :disabled="closed" @click="withdraw">赎回</button>
    </div>
  </div>

  <!-- 当读者未参与，显示如下div  -->
  <div v-if="!joined" class="card-bkg">
    <div class="award-des">
      <span> 当前众筹价格 </span>
      <b> {{ price }} ETH </b>
    </div>

    <button :disabled="closed" @click="join">参与众筹</button>
  </div>

  <!--  如果是创作者，显示 -->
  <div v-if="isAuthor">
    <button :disabled="closed" @click="withdrawFund"> 提取资金</button>
  </div>

</div>
</template>

<script>
const Web3 = require('web3')
import {address, ABI} from '../contracts/Crowdfunding'
export default {
  name: 'CrowdFund',
  // 定义上面HTML模板中使用的变量
  data() {
    return {
      author: '0xC9668FD7c8d18935aC36c233B4345F4470634C07',
      price: null,
      target: 10,
      total: 0,
      closed: true,
      joinPrice: null,
      joined: false,
      endDate: "null",
      isAuthor: true,
    }
  },

  // 当前Vue组件被创建时回调的hook 函数
  async created() {
    //  初始化 web3及账号
    await this.initWeb3Account()
    // await this.initContract()
    await this.onAccountsChanged()

  },

  methods: {

    async initWeb3Account() {

      if(window.ethereum!==undefined){
        this.provider = window.ethereum;
        try {
          window.ethereum.request({ method: 'eth_requestAccounts' });
        }catch(error){
          console.log("User rejected the request.")
        }
      }else if(window.web3!==undefined){
        this.provider = window.web3.currentProvider;
      }else{
        this.provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/d3d7efacf489482785f091bbf019f2a9')
        console.log('请在钱包中浏览当前页面!')
      }
      this.web3 = new Web3(this.provider);

      this.web3.eth.getAccounts().then(accs =>{
        this.account = accs[0]
        this.initContract()
      })

    },
    async initContract() {
      this.crowdFund = new this.web3.eth.Contract(ABI,address)
      console.log(this.account)
      console.log(this.crowdFund.options.address)
      this.getCrowdInfo()
    },
    //  获取合约的状态信息
    async getCrowdInfo() {
      // 获取合约的余额
      this.web3.eth.getBalance(this.crowdFund.options.address).then(
        r => {
          this.total = this.web3.utils.fromWei(r)
          console.log(this.total)
        }
      )

      // 获取读者的参与金额
      this.crowdFund.methods.joined(this.account).call()
      .then(res=>{
        if (res > 0) {
          this.joined = true
          this.joinPrice = this.web3.utils.fromWei(res)
        }else{
          this.joined = false
          this.joinPrice = 0
        }
      })
      // 获取合约的关闭状态
      this.crowdFund.methods.closed().call().then(
        r => this.closed = r
      )

      // 获取当前的众筹价格
      this.crowdFund.methods.price().call().then(
        r => this.price = this.web3.utils.fromWei(r)
      )

      // 获取众筹截止时间
      this.crowdFund.methods.endTime().call().then(r => {
        this.endTimeStamp = r * 1000
        console.log(r * 1000)
        var endTime = new Date(r * 1000)

        // 把时间戳转化为本地时间
        this.endDate = endTime.toLocaleDateString().replace(/\//g, "-") + " " + endTime.toTimeString().substr(0, 8);
      })

      // 获取众筹创作者地址
      this.crowdFund.methods.author().call().then(r => {
        if (this.account == r) {
          this.isAuthor = true
        } else {
          this.isAuthor = false
        }
      })
    },

     // 监听account 变化
    async onAccountsChanged() {
      if (!window.ethereum) {
        console.log('DApp browser, please!')
        return
      }
      window.ethereum.on('accountsChanged', (accounts) => {
        // console.log('accountsChanged', accounts[0], ' - ', Date.now())
        if (accounts && accounts[0]) {
          console.log('CrowdFund accountsChanged')
          this.account = accounts[0]
          this.getCrowdInfo()
        } else {
          console.log('Connect to account failed!')
        }
      });
    },
    join(){
      if(new Date(this.endTimeStamp) < new Date() && this.closed){
        console.log("众筹已结束!")
        return
      }

      this.web3.eth.sendTransaction({
        from: this.account,
        value: this.web3.utils.toWei(this.price),
        gas: 75440,
        to: address
      }).on('transactionHash', (hash)=>{
        console.log(hash)
      })
      .on('receipt', (receipt) => {
        // this.getCrowdInfo()
        console.log(receipt)
        // 获取读者的参与金额
        this.crowdFund.methods.joined(this.account).call()
        .then(res=>{
          console.log("receipt res:", res)
          if (res > 0) {
            this.joined = true
            this.joinPrice = this.web3.utils.fromWei(res)
          }else{
            this.joined = false
            this.joinPrice = 0
          }
        })
      })
      .on('error', (err) => {
        console.error(err);
      });
    },
    withdrawFund(){
      if(this.account!= this.author){
        console.log("你不是作者!")
        return
      }
      if(this.total<this.target){
        console.log("未达到众筹目标!")
        return
      }
      this.crowdFund.withdrawFund()
      .send({
        from: this.account
      }).then(() => {
        this.getCrowdInfo()
      })
    },
    withdraw(){
      if(new Date(this.endTimeStamp) >= new Date()){
        console.log("还未到众筹结束时间!")
        return
      }
      if(this.closed){
        console.log("众筹达标，众筹资金已提取!")
        return
      }
      if(this.total>=this.target){
        console.log("众筹达标，你没法提取资金!")
        return
      }
      this.crowdFund.methods
      .withdraw()
      .send({
        from: this.account
      }).then(() => {
        this.getCrowdInfo()
      })
    },
    crowdList(){
      this.$router.push({ path: '/list/' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  color: #47745f;
}
</style>
