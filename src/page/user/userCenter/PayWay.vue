<template>
  <div class="payWay">
    <div >
        <div :class="item.enable === '1'?'open':'close'" v-for="item in receipts">
          <img v-if="item.receiptsWay === 'alipay'" src="../../../../static/img/zfb.jpg">
          <img v-if="item.receiptsWay === 'bankCard'" src="../../../../static/img/yhk.png">
          <img v-if="item.receiptsWay === 'wechat'" src="../../../../static/img/wx.jpg">
          <p v-if="item.receiptsWay === 'bankCard'" >
            <span>{{item.receiptsInfo.bankDeposit}}</span><br/>
            <span>{{item.receiptsInfo.bankAccount}}</span>
          </p>
          <p v-if="item.receiptsWay !== 'bankCard'" >{{item.receiptsInfo.account}}</p>
           <div>
             <i></i>
           </div>
        </div>
       <div class="add" v-on:click="toAdd">
         <img src="../../../../static/img/add.png">
         <p>{{$t("lang.userCenter.addPayWay")}}</p>
       </div>
     </div>
  </div>
</template>

<script>
import * as api from '../../../service/getData'
export default {
  name: 'PayWay',
  components: {
  },
  data () {
    return {
      receipts: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    toAdd () {
      this.$router.push('addPayWay')
    },
    async init() {
      let data = await api.getReceipts()
      if (data.status === 200) {
        this.receipts = data.data
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../style/var";
  .payWay{
    >div:nth-child(1) {
      >div{
        width: 223px;
        height: 120px;
        border-radius: 8px;
        text-align: center;
        position:relative;
        float:left;
        margin-right:15px;
        >img{
          width:28px;
          height:28px;
          margin-top:28px;
          border-radius: 50%;
        }
        p{
          font-size: 14px;
          margin-top:12px;
        }
        >div{
          position:absolute;
          right:10px;
          top:10px;
          width: 46px;
          height: 20px;
          border-radius: 27px;
          text-align: left;
          cursor: pointer;
          >i{
            width: 16px;
            height: 16px;
            display:inline-block;
            border-radius: 50%;
            margin-left:1px;
            position:relative;
            font-size:12px;
          }
        }
      }
      .open{
        background-color: #294486;
        >div{
          border:2px solid #2f56b2;
          >i{
            background-color: #437af8;
          }
          >i:after{
            content:'开';
            position:absolute;
            right:-20px;
          }
        }
      }
      .close{
        border: solid 2px #284585;
        >div{
          border:2px solid #304a87;
          >i{
            background-color: #304a87;
          }
          >i:after{
            content:'关';
            position:absolute;
            right:-20px;
          }
        }
      }
      .add{
        border: solid 2px #4177fc;
        color: #a9c2fd;
        cursor: pointer;
      }

    }
  }
</style>
