<template>
  <div class="currEntrustList">
    <div>
      {{$t("lang.exchange.lastPrice")}} 9827.69 USDT ~ 54983.35
    </div>
    <div>
      <div>
        <table cellpadding="0" cellspacing="0">
          <tr><th></th><th>{{$t("lang.exchange.price")}}(USDT)</th><th>{{$t("lang.exchange.amount")}}(BTC)</th><th>{{$t("lang.exchange.sum")}}(BTC)</th></tr>
         <tr v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index"><td>{{$t("lang.exchange.sell")}}{{item}}</td><td>{{(92.82-0.1*item).toFixed(2)}}</td><td>{{(0.00010+0.00001*item).toFixed(5)}}</td><td>4.5665545</td></tr>
        </table>
      </div>
      <div>
        <table cellpadding="0" cellspacing="0">
          <tr><th></th><th>{{$t("lang.exchange.price")}}(USDT)</th><th>{{$t("lang.exchange.amount")}}(BTC)</th><th>{{$t("lang.exchange.sum")}}(BTC)</th></tr>
          <tr v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index"><td>{{$t("lang.exchange.buy")}}{{item}}</td><td>{{(92.82-0.1*item).toFixed(2)}}</td><td>{{(0.00010+0.00001*item).toFixed(5)}}</td><td>4.5665545</td></tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrEntrustList',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./../../../style/var";
  .currEntrustList{
    >div:nth-child(1) {
      height:66px;
      line-height:66px;
      background:@bg_color;
      font-size:18px;
      color:#fff;
      padding-left:66px;
    }
    >div:nth-child(2) {
      display:flex;
      flex-wrap:wrap-reverse;
      th{
        text-align: left;
      }
      >div:nth-child(1) {
        table{
          tr{
            td:nth-child(2){
              color: #fafc68;
            }
          }
        }
      }
      >div:nth-child(2) {
        table{
          tr{
            td:nth-child(2){
              color: #00eeff;
            }
          }
        }
      }
      >div{
        flex:1;
        display:inline-block;
        table{
          width:100%;
          font-size:13px;
          tr{
            line-height: 45px;
            td:nth-child(1) {
              padding-left:20px;
            }
          }
          tr:nth-child(even) {
            background:@bg_color;
          }
          tr:nth-child(odd) {
            background:#273a67;
          }
        }
      }
    }
}
</style>
