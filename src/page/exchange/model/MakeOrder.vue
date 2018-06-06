<template>
  <div v-if="isShow" class="makeOrder">
     <div class="mask"></div>
     <div class="order-content">
         <div>
             <div class="header">
               <div>
                 <p>使用人民币购买BTC资产</p>
                 <span>发起交易</span>
               </div>
               <div>
                 <p>火币网</p>
                 <span>通过交易所</span>
               </div>
               <div>
                 <a v-on:click="closeMakeOrder">关闭</a>
               </div>
             </div>

            <div class="orderInfo">
               <div>
                  <p>{{$t("lang.otc.productInfo")}}</p>
                   <p><span>{{$t("lang.otc.merchant")}}:</span><span>老吴</span></p>
                   <p><span>{{$t("lang.otc.price")}}:</span><span>501252BTC </span></p>
                   <p><span>{{$t("lang.otc.volume")}}:</span><span>2.435456BTC</span></p>
                   <p><span>{{$t("lang.otc.seller")}}:</span><span>lotus</span></p>
                   <p><span>{{$t("lang.otc.oPaymenthod")}}:</span><span>支付宝</span></p>
                   <p><span>{{$t("lang.otc.oLimits")}}:</span><span>5000-20000</span></p>
                   <p><span>{{$t("lang.otc.exchange")}}:</span><span>火币网</span></p>
                   <p><span>{{$t("lang.otc.address")}}:</span><span>香港</span></p>
                   <p><span>{{$t("lang.otc.timeLimit")}}:</span><span>60分钟</span></p>
               </div>

               <div>
                  <div>
                    <p>{{$t("lang.otc.buyInfo")}}</p>
                    <div>
                      <span>{{$t("lang.otc.buyAmount")}}</span>
                      <input />
                      <span>BTC</span>
                    </div>
                    <div>
                      <span>{{$t("lang.otc.buyPrice")}}</span>
                      <input />
                      <span>CNY</span>
                    </div>
                    <div>
                      <span>{{$t("lang.otc.leaveWord")}}</span>
                      <textarea />
                      <span></span>
                    </div>
                    <div>
                      <a class="btn" v-on:click="submit">{{$t("lang.otc.placeOrder")}}</a>
                    </div>
                  </div>
               </div>
            </div>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'MakeOrder',
  components: {
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
  },
  methods: {
    closeMakeOrder () {
      this.isShow = false
    },
    showMakeOrder () {
      this.isShow = true
    },
    submit () {
      this.isShow = false
      this.$mask.showAlert('订单已发送', 'success')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../style/var";
.makeOrder{
  padding:40px;
  .mask{
    position:fixed;
    width:100%;
    height:100%;
    z-index:2;
    top:0;
    left:0;
    background:@bg_color;
    opacity:0.8;
  }
  .order-content{
    width:100%;
    height:100%;
    position:fixed;
    box-sizing: border-box;
    padding:100px 40px 40px;
    z-index:3;
    top:0px;
    left:0px;
    >div{
      background-color: #26375d;
      padding:40px;
      .header{
        width:100%;
        height:94px;
        background-color: #284585;
        display:flex;
        flex-wrap: wrap-reverse;
        >div{
          flex:1;
          >p{
            margin-top:22px;
          }
          >span{
            color: #a9c2fd;
            font-size:16px;
            margin-top:5px;
          }
        }
        >div:nth-child(1) {
          padding-left:30px;
          p{
            font-size:18px;
          }
        }
        >div:nth-child(2) {
          text-align: center;
          p{
            font-size:18px;
          }
        }
        >div:nth-child(3) {
          font-size:18px;
          line-height: 94px;
          text-align: right;
          margin-right:50px;
          a{
            cursor: pointer;
          }
        }
      }

      .orderInfo {
         width:100%;
         background-color: #284585;
         margin-top:30px;
         display:flex;
         flex-wrap:wrap-reverse;
         >div{
           flex:1;
           text-align: center;
         }
         >div:nth-child(1) {
           padding-bottom:40px;
           border-right:1px solid #26375d;
           p:nth-child(1) {
             font-size:20px;
              margin:24px 0;
           }
           p{
             line-height:35px;
             >span {
               display:inline-block;
               width:130px;
               text-align: left;
             }
           }
         }
        >div:nth-child(2) {
          width:580px;
          margin:0px auto;
          p:nth-child(1) {
            font-size:20px;
            margin:24px 0;
          }
          >div{
            >div{
              margin-bottom:10px;
              text-align: center;
            }
            span:nth-child(1) {
              width:64px;
              text-align: right;
              font-size:16px;
              display:inline-block;
            }
            span:nth-child(3) {
              width:64px;
              text-align: left;
              display:inline-block;
            }
            input, textarea{
              width: 425px;
              height: 50px;
              background-color: #273c6e;
              border-radius: 8px;
              margin:0 14px;
              border: solid 2px #304a87;
              font-size: 16px;
              color:#fff;
              padding-left:10px;
            }
            textarea{
              height:150px;
            }
          }
        }
        .btn{
          width: 346px;
          height: 50px;
          background-color: #4177fc;
          border-radius: 93px;
          display:inline-block;
          line-height: 50px;
          margin:38px auto;
          cursor: pointer;
        }
      }

    }
  }
}
</style>
