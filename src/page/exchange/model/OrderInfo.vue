<template>
  <div v-if="isShow" class="orderInfo">
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
                  <p>{{$t("lang.otc.buyInfo")}}</p>
                   <p><span>{{$t("lang.otc.orderNum")}}:</span><span>HBAC80299912</span></p>
                   <p><span>{{$t("lang.otc.buy")}}:</span><span>501252BTC </span></p>
                   <p><span>{{$t("lang.otc.price")}}:</span><span>51000 BTC</span></p>
                   <p><span>{{$t("lang.otc.totalPrice")}}:</span><span>800000 CNY</span></p>
                   <p><span>{{$t("lang.otc.exchange")}}:</span><span>火币网</span></p>
               </div>

               <div>
                   <div>
                       <p>{{$t("lang.otc.payInfo")}}</p>
                       <div>
                         <span>{{$t("lang.otc.bankCard")}}:</span>
                         <span>吴城 432421345844565225 中国银行 浦东大道支行</span>
                       </div>
                       <div>
                         <span>{{$t("lang.otc.alipay")}}:</span>
                         <span>吴城 laowu@163.com</span>
                       </div>
                     <div v-if="status === 0">
                       <span></span>
                       <span>已取消</span>
                     </div>
                       <div v-if="status === 1">
                         <span>{{$t("lang.otc.needPay")}}:</span>
                         <span>80000元,请在<i>59分36</i>秒完成支付</span>
                       </div>
                       <div v-if="status === 2">
                           <span></span>
                           <span>已支付</span>
                       </div>
                     <div v-if="status === 0">
                       <span></span>
                       <a class="payed btn" >订单已被取消 </a>
                     </div>
                       <div v-if="status === 1">
                         <span></span>
                         <a class="paing btn" v-on:click="submit">确认已支付￥8000 </a>
                       </div>
                       <div v-if="status === 2">
                           <span></span>
                           <a class="payed btn" v-on:click="payed">已支付,待卖家确认收款 </a>
                        </div>
                       <div>
                         <span></span>
                         <div v-if="status === 3" class="finish">
                           <img src="../../../../static/img/img_wallet.png">
                            卖家已确认收款,数字货币已入账请查收您的数字货币账户
                         </div>
                       </div>
                       <div v-if="status === 1">
                         <span></span>
                         <span>未完成支付请勿点击确认,否则将影响你的记录</span>
                       </div>
                       <p class="careful">
                         <span>{{$t("lang.otc.prompt1")}}</span>
                         <span>{{$t("lang.otc.prompt2")}}</span>
                         <span>{{$t("lang.otc.prompt3")}}</span>
                         <span>{{$t("lang.otc.prompt4")}}</span>
                       </p>
                     </div>

                     <a v-if="status ===1" v-on:click="cancelOrder" class="cancelOrder opera-btn">{{$t("lang.otc.cancelOrder")}}</a>
                     <a v-if="status ===2" class="apply-btn opera-btn">申诉</a>
               </div>
            </div>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  components: {
  },
  data () {
    return {
      isShow: false,
      status: 1
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
      this.status = 2
    },
    payed () {
      this.status = 3
    },
    cancelOrder () {
      let _this = this
      this.$mask.showAlert('确定要取消订单么？', 'doubt', function () {
        _this.status = 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../style/var";
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
.orderInfo{
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
         >div:nth-child(1) {
           flex:2;
           padding-bottom:40px;
           text-align: center;
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
          flex:3;
          position:relative;
          .opera-btn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position:absolute;
            top:10px;
            right:30px;
            color:#fff;
            border-radius: 8px;
            cursor:pointer;
          }

          .cancelOrder{
            background-color: #e24d4d;
          }
          .apply-btn{
            background-color:#4d5de2;
          }

          >div {
            width:580px;
            margin:0px auto;
            p:nth-child(1) {
              font-size:20px;
              margin:24px 0;
              text-align: center;
            }
            >div:nth-child(3) {
              i{
                color:#ff36e0;
              }
            }
            >div{
              margin-bottom:17px;
              span:nth-child(1) {
                width:120px;
                text-align: left;
                font-size:16px;
                display:inline-block;
              }
              span:nth-child(2) {
                text-align: left;
                display:inline-block;
              }
            }
          }
        }
        .btn{
          width: 346px;
          height: 50px;
          border-radius: 93px;
          display:inline-block;
          line-height: 50px;
          margin:38px auto 0px;
          cursor: pointer;
          text-align: center;
        }
        .finish{
          display:inline-block;
          width:446px;
          height:108px;
          margin-top:50px;
          background:@bg_color;
          padding-left:127px;
          padding-top:35px;
          padding-right:25px;
          position:relative;
          border-radius: 12px;
          img{
            position:absolute;
            top:-35px;
            left:25px;
          }
        }
        .paing{
          background-color: #4177fc;
        }
        .payed{
          background-color: @bg_color;
        }
        .careful{
          margin:50px 0px;
          span{
            display:block;
            color: #a9c2fd;
            font-size:14px;
          }
        }
      }

    }
  }
}
</style>
