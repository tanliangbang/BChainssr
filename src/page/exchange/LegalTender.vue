<template>
  <div class="legalTender">
     <MakeOrder ref="makeOrder"/>
     <OrderInfo ref="orderInfo"/>
     <section>
       <header>
          <div>
             <div>买</div>
             <div>
                <a v-on:click="changeType('sellbtc')" :class="currType==='sellbtc'?'selected':''">BTC</a>
                <a v-on:click="changeType('selleth')" :class="currType==='selleth'?'selected':''">ETH</a>
                <a v-on:click="changeType('sellusdt')" :class="currType==='sellusdt'?'selected':''">USDT</a>
             </div>
          </div>
           <div>
             <div>卖</div>
             <div>
               <a v-on:click="changeType('buybtc')" :class="currType==='buybtc'?'selected':''">BTC</a>
               <a v-on:click="changeType('buyeth')" :class="currType==='buyeth'?'selected':''">ETH</a>
               <a v-on:click="changeType('buyusdt')" :class="currType==='buyusdt'?'selected':''">USDT</a>
             </div>
           </div>
           <div>
            <!-- <div>
                 <p>支持币种</p>
                 <span>全部</span>
               </div>
               <div>
                 <p>付款方式</p>
                 <span>全部</span>
               </div>
               <div>
                 <p>交易场所</p>
                 <span>全部</span>
               </div>-->
           </div>
       </header>
       <div class="exList">
         <table border="0" cellpadding="0" cellspacing="0">
           <tr>
             <th width="20%">商家</th>
             <th width="15%">数量</th>
             <th width="15%">限额</th>
             <th width="15%" >单价</th>
             <th width="15%">支付方式</th>
             <th width="10%">交易所</th>
             <th width="10%">操作</th>
           </tr>
           <tr v-for="(item, index) in data[currType]" :key="index">
             <td>{{item.userName}}</td>
             <td>{{item.tradeCount}}</td>
             <td>{{item.minTradeLimit+"-"+item.maxTradeLimit}}</td>
             <td>{{item.price}}</td>
             <td>
               <img v-if="item.payMethod.split(',')[0]" src="../../../static/img/yhk.png">
               <img v-if="item.payMethod.split(',')[1]" src="../../../static/img/zfb.png">
               <img v-if="item.payMethod.split(',')[2]" src="../../../static/img/wx.png">
             </td>
             <td>{{item.exchange}}</td>
             <td><a class="showExchagne" v-on:click="makeOrder">去交易</a></td>
           </tr>
         </table>
         <div>
            <span>上一页</span>
            <span>06/10</span>
            <span>下一页</span>
         </div>
       </div>

       <div class="myOrder">
         <header>
           <span>我的订单</span>
           <div class="search">
             <input type="text" placeholder="订单号/日期/状态/对手方">
             <button>搜索</button>
           </div>
         </header>

         <table border="0" cellpadding="0" cellspacing="0">
           <tr>
             <th width="12.5%">订单号</th>
             <th width="12.5%">方向</th>
             <th width="12.5%">币种</th>
             <th width="12.5%">交易数量</th>
             <th width="12.5%">总价</th>
             <th width="12.5%">时间</th>
             <th width="12.5%">状态</th>
             <th width="12.5%">对手方</th>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已付款</td>
             <td>风清扬</td>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已付款</td>
             <td>风清扬</td>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已取消</td>
             <td>风清扬</td>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已付款</td>
             <td>风清扬</td>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已付款</td>
             <td>风清扬</td>
           </tr>
           <tr v-on:click="showOrderInfo">
             <td>HB20214</td>
             <td>买入</td>
             <td>BTC</td>
             <td>2.234234</td>
             <td>1212312 CNY</td>
             <td>2018/04/19 12:21:37</td>
             <td>已付款</td>
             <td>风清扬</td>
           </tr>
         </table>
       </div>
     </section>
  </div>
</template>

<script>
import MakeOrder from './model/MakeOrder'
import OrderInfo from './model/OrderInfo'
import sellbtc from './../../../static/data/sellbtc'
import selleth from './../../../static/data/selleth'
import sellusdt from './../../../static/data/sellusdt'
import buybtc from './../../../static/data/buybtc'
import buyeth from './../../../static/data/buyeth'
import buyusdt from './../../../static/data/buyusdt'
export default {
  name: 'LegalTender',
  components: {
    MakeOrder,
    OrderInfo
  },
  data () {
    return {
      currType: 'sellbtc',
      data: {
        sellbtc: sellbtc.data,
        selleth: selleth.data,
        sellusdt: sellusdt.data,
        buybtc: buybtc.data,
        buyeth: buyeth.data,
        buyusdt: buyusdt.data
      }
    }
  },
  created () {
    let data = this.data
    let temp = null
    let num = 0
    let changeList = ['火币', 'Bit-Z', 'Cointiger', 'Tokencan', '火币']
    for (let item in data) {
      temp = data[item]
      for (let i = 0; i < temp.length; i++) {
        num = (temp[i].tradeCount + '').split('.')[1]
        if (num) {
          temp[i].tradeCount = temp[i].tradeCount + new Array(7 - num.length).join('0')
        } else {
          temp[i].tradeCount = temp[i].tradeCount + '.000000'
        }
        num = (temp[i].price + '').split('.')[1]
        console.log(temp[i].price)
        if (num) {
          temp[i].price = num.length === 1 ? temp[i].price + '0' : temp[i].price
        } else {
          temp[i].price = temp[i].price + '.00'
        }
        temp[i].exchange = changeList[Math.floor(Math.random() * 5)]
      }
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    makeOrder () {
      this.$refs.makeOrder.showMakeOrder('recharge')
    },
    showOrderInfo () {
      this.$refs.orderInfo.showMakeOrder('enchashment')
    },
    changeType (str) {
      this.currType = str
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./../../style/common";
@import "./index";
.showExchagne:after{
  content:" ";
  width: 0;
  height: 0;
  position:absolute;
  top:5px;
  left:50px;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
  border-left: 6px solid #0087ff;
}
.showExchagne:before{
  content:" ";
  width: 0;
  height: 0;
  position:absolute;
  top:5px;
  left:58px;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
  border-left: 6px solid #0087ff;
}
.showExchagne {
  cursor: pointer;
  position:relative;
}
</style>
