<template>
  <div class="entrust">
        <div>
          <a class="selected">{{$t("lang.exchange.limitOrder")}}</a>
          <div>
            <div class="praceInput">
              <span>{{$t("lang.exchange.price")}}(BTC)</span><input />
              <p>~54254.355</p>
            </div>
            <div class="praceInput">
              <span>{{$t("lang.exchange.amount")}}(BTC)</span><input />
              <div class="process">
                <i></i><span></span><i></i><span></span><i></i><span></span><i></i><span></span><i></i>
              </div>
            </div>
            <div class="totalPrice">
              交易金额: 0.255455844USDT
            </div>
            <a class="buyBtn">{{$t("lang.exchange.mbuy")}} BTC</a>
          </div>
        </div>
        <div>
          <a>{{$t("lang.exchange.marketOrder")}}</a>
          <div>
            <div class="praceInput">
              <span>{{$t("lang.exchange.price")}}(BTC)</span><input />
              <p>~54254.355</p>
            </div>
            <div class="praceInput">
              <span>{{$t("lang.exchange.amount")}}(BTC)</span><input />
              <div class="process">
                <i></i><span></span><i></i><span></span><i></i><span></span><i></i><span></span><i></i>
              </div>
            </div>
            <div class="totalPrice">
              交易金额: 0.255455844USDT
            </div>
            <a class="buyBtn">{{$t("lang.exchange.msell")}} BTC</a>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Entrust',
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
@import "../../../style/var";
.entrust{
  margin-top:34px;
  width:100%;
  display:flex;
  flex-wrap: wrap-reverse;
  >div{
    flex:1;
    >a:nth-child(1) {
      display:block;
      text-align: center;
      height:45px;
      line-height: 45px;
    }
    >div:nth-child(2) {
      height:369px;
      background:@bg_color;
    }
  }
  .selected{
    background-color: #273c6c;
    border-top-right-radius: 50px;
  }
  .praceInput{
    padding-top:22px;
    padding-left:17px;
    >span{
      display:inline-block;
      height:50px;
      line-height: 50px;
    }
    input{
      width: 272px;
      height: 50px;
      background-color: #273c6e;
      border-radius: 8px;
      border: solid 2px #304a87;
      margin-left:5px;
      padding:30px;
      color:#fff;
      font-size:16px;
    }
    p{
      padding-left:99px;
      color: #688bdb;
      font-size:14px;
      margin:7px 0 0 0;
    }
    .process{
      padding-left:80px;
      margin-top:15px;
      >i{
        width:10px;
        height:10px;
        border-radius: 50%;
        border: solid 2px #3362d6;
        display:inline-block;
        margin-top:3px;
        vertical-align: -3px;
      }
      >span{
        background-color: #3463d7;
        height:2px;
        width:54px;
        display:inline-block;
      }
    }
  }
  .totalPrice{
    font-size: 16px;
    margin-top:40px;
    color:#fff;
    text-align: center;
  }
  .buyBtn{
    width: 276px;
    height: 44px;
    background-color: #304a88;
    border-radius: 93px;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    display:block;
    margin:10px auto 0px;
  }
}
</style>
