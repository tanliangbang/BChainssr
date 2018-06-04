<template>
  <div class="assetManage" v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
    <RechargeAndEnchashment ref="reEn"/>
    <div class="asset-header">
      <div>
        <div>今日</div>
        <div>
          <span class="raise">+9.12%</span>
          <span>0.0122566BTC</span>
        </div>
        <div>总计</div>
        <div>
          <span class="raise">+15.56%</span>
          <span>0.0122566BTC</span>
        </div>
      </div>

      <div>
         <span>1234.2454BTC</span>
         <span>~254665585.23 CNY</span>
         <span>总资产</span>
      </div>
    </div>

    <div class="asset-coin-list">
      <div>
        <ul>
          <li>交易账户</li>
          <li class="selected">火币网</li>
          <li>OKex</li>
          <li>Bit-Z</li>
          <li>CoinTiger</li>
        </ul>
      </div>

      <div>
          <div>
            <span>火币网</span>
            <span><i>今日</i>934.254BTC</span>
            <span><i>资产</i>934.254BTC</span>
            <span><router-link to="financeRecord">财务记录</router-link></span>
          </div>
          <table cellspacing="0">
            <tr><th></th><th>币种</th><th>可用</th><th>冻结</th><th colspan="2">操作</th><th></th></tr>
            <tr v-for="item in [1,2,3,4,5,6,7]" :key="item"><td></td><td>BTC</td><td>930.23</td><td>236.556</td><td><a v-on:click="recharge">充币</a></td><td><a v-on:click="enchashment">提币</a></td><td></td></tr>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
import RechargeAndEnchashment from './model/RechargeAndEnchashment'
export default {
  name: 'AssetManage',
  components: {
    RechargeAndEnchashment
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    recharge () {
      this.$refs.reEn.showEnRe(1)
    },
    enchashment () {
      this.$refs.reEn.showEnRe(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../style/var";
.assetManage{
  margin:30px 200px;
  .asset-header{
    height: 128px;
    border:1px solid  #274ca1;
    >div:nth-child(1){
      >div{
        float:left;
      }
      >div:nth-child(1),div:nth-child(3){
        margin:44px 20px 59px 76px;
      }
      >div:nth-child(2),div:nth-child(4){
        margin-top:35px;
        margin-right:128px;
        >span{
          display:block;
        }
        >span:nth-child(1){
          font-size:26px;
        }
        >span:nth-child(2){
          font-size:14px;
          color: #a9c2fd;
        }
      }
    }

    >div:nth-child(2){
      float:right;
      margin-right:90px;
      >span{
        text-align: right;
        display:block;
      }
      >span:nth-child(1){
        margin-top:22px;
        font-size: 30px;
      }
      >span:nth-child(2){
        font-size:14px;
        color: #a9c2fd;
      }
      >span:nth-child(3){
        font-size:16px;
        color: #a9c2fd;
      }
    }
  }

  .asset-coin-list{
    height:658px;
    margin-top:15px;
    display:flex;
    flex-wrap: wrap-reverse;
    >div:nth-child(1){
      background:@bg_color;
      flex:3;
      margin-right:10px;
      ul{
        li:nth-child(1){
          line-height: 90px;
        }
        li{
          line-height: 60px;
          text-align: center;
          font-size:18px;
        }
        .selected{
          background-color: #284585;
          border-left:10px solid #0087ff;
        }
      }
    }
    >div:nth-child(2){
      flex:7;
      background:@bg_color;
      >div:nth-child(1){
        margin:0px 48px;
        display:flex;
        flex-wrap: wrap-reverse;
        >span{
          flex:1;
          line-height: 90px;
          text-align: center;
        }
        >span:nth-child(4){
          cursor: pointer;
          a{
            color: #269aff;
          }
        }
      }
      table{
        width:100%;
        th{
          text-align: left;
          background:#284585;
        }
        td{
          background:#274075;
        }
        td,th{
          line-height: 60px;
          border-bottom:1px solid @index_bg;
        }
        th:nth-child(5){
          text-align: center;
        }
        td:nth-child(5),td:nth-child(6){
          text-align: center;
          color:#00eeff;
          cursor: pointer;
        }
        td:nth-child(1),th:nth-child(1){
          width:130px;
        }
        td:last-child,th:last-child{
          width:130px;
        }
      }
    }
  }
}
</style>
