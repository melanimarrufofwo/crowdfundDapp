<template>
  <div class="List">
    <h1>Players</h1>
    <ul>
      <li v-for="(v, k) of list" :key="k">
        <span class="sid"> {{ v.id }}</span>
        <span class="sdate">date: {{ v.date }}</span>
        <span class="sfund">fund: {{ v.price }} ether</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getCrowdfundList } from "../utils/crowdfund";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    stapToDate(datetime) {
      var date = new Date(datetime*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
      // 拼接
      var result =
        year +
        "-" +
        month +
        "-" +
        sdate +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      // 返回
      return result;
    },
    initData() {
      getCrowdfundList({ first: 10 })
        .then((res) => {
          let players = res.data.playerEntities;
          let len = players.length;
          for (let i = 0; i < len; ++i) {
            this.list.push({
              id: players[i].id,
              date: this.stapToDate(players[i].date),
              price: players[i].price / 1e18,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  /* justify-content: flex-start; */
}
li {
  /* display: inline-block; */
  margin: 10px 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 30px;
  position: relative;
  box-shadow: 10px 10px 5px #678172;
}
li::before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: black;
  top: 10px;
  left: 0x;
}
li > span{
  text-indent: 10px;
}
a {
  color: #42b983;
}
</style>
