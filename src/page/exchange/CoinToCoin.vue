<template>
  <div class="coinToCoin mainMg" v-on:click="containerClick">
    <section>

       <div class="coin-nav">
         <span v-on:click="changeBase('zx')" :class="currSelect==='zx'?'selected':''">{{$t("lang.exchange.optional")}}</span>
         <span v-on:click="changeBase('btc')" :class="currSelect==='btc'?'selected':''">BTC</span>
         <span v-on:click="changeBase('eth')" :class="currSelect==='eth'?'selected':''">ETH</span>
         <span v-on:click="changeBase('usdt')" :class="currSelect==='usdt'?'selected':''">USDT</span>
       </div>

      <div class="container">

         <div class="coin-list">
           <div class="search">
             <input type="text" :placeholder='$t("lang.exchange.searchPromit")'>
             <button>{{$t("lang.exchange.search")}}</button>
           </div>
           <ul>
             <li v-on:click="changeCoin(item)" v-for="(item, index) in data[currSelect]" :class="currItem.name===item.name?'selected':''" :key="index">
               <span><img src="./../../../static/img/collectioned.png"/></span>
               <span>{{item.name}}({{item.exchange}})</span>
               <span>{{item.vol}}</span>
             </li>
           </ul>
         </div>

        <div class="coin-detail">
           <div class="coin-header">
             <span>{{currItem.name}}</span>
             <span :class= "currItem.exchangeList[0].isUp?'raise':'fail'">{{currItem.exchangeList[0].upAndowm}}</span>
             <div>{{currItem.price}}
               <span v-on:click="changeSort()">{{$t("lang.exchange.price")}}</span><div v-on:click="changeSort()" :class="sort==='up'?'triangle up':'triangle down'"><span></span><span></span></div>
             </div>
           </div>
          <div class="exchange-list">
              <ul>
                <li :class="currItem.exchange===item.exChangeName?'selected':''" v-if="currItem.exchangeList" v-for="(item, index) in currItem.exchangeList" :key="index">
                  <div> {{item.price}}</div>
                  <div>
                    <span>{{item.exChangeName}}</span>
                    <span :class= "item.isUp?'raise':'fail'">{{item.upAndowm}}</span>
                  </div>
                </li>
              </ul>
          </div>

          <KeyLine ref="keyLine" v-bind:coin="currItem.name"/>

          <div class="buy-input-list">
             <div>
                <div class="my-info">
                   <div>
                      <p>{{$t("lang.exchange.coinAsset")}}</p>
                      <p>{{$t("lang.exchange.total")}}:1234.565BTC</p>
                   </div>
                   <div>
                     <p>BTC {{$t("lang.exchange.available")}}15.8</p>
                     <p>USDT {{$t("lang.exchange.available")}}80.28</p>
                   </div>
                   <div>
                     <p><router-link to="legalTender">{{$t("lang.exchange.rechange")}}BTC</router-link></p>
                     <p><router-link to="legalTender">{{$t("lang.exchange.rechange")}}USDT</router-link></p>
                   </div>
                </div>

                <div>
                  <Entrust/>
                </div>
             </div>

             <div>
               <CurrEntrustList/>
             </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import KeyLine from './model/KeyLine'
import CurrEntrustList from './model/CurrEntrustList'
import Entrust from './model/Entrust'
import data from './data'
export default {
  name: 'CoinToCoin',
  components: {
    KeyLine,
    CurrEntrustList,
    Entrust
  },
  data () {
    return {
      currSelect: 'btc',
      data: data,
      currItem: data['btc'][0],
      sort: 'up'
    }
  },
  created () {
    let curr = null
    for (let item in this.data) {
      for (let i = 0; i < this.data[item].length; i++) {
        curr = this.data[item][i].exchangeList
        for (let j = 0; j < curr.length; j++) {
          if (curr[j].upAndowm.includes('+')) {
            curr[j].isUp = true
          } else {
            curr[j].isUp = false
          }
        }
      }
    }
    this.priceSort(this.data, this.sort)
  },
  mounted () {
  },
  methods: {
    containerClick () {
      this.$refs.keyLine.maskShow = true
    },
    changeBase (str) {
      this.currSelect = str
      this.currItem = this.data[str][0]
      this.$refs.keyLine.changeSymbol(this.currItem)
    },
    changeCoin (item) {
      this.currItem = item
      this.$refs.keyLine.changeSymbol(item)
    },
    changeSort () {
      this.sort = this.sort === 'up' ? 'down' : 'up'
      this.priceSort(this.data, this.sort)
    },
    priceSort (data, up) {
      let curr = null
      let temp = {}
      for (let item in data) {
        for (let i = 0; i < data[item].length; i++) {
          curr = this.data[item][i].exchangeList
          for (let j = 0; j < curr.length; j++) {
            for (let k = j + 1; k < curr.length; k++) {
              if (parseFloat(curr[j].price.split(' ')) > parseFloat(curr[k].price.split(' '))) {
                if (up === 'up') {
                  temp.price = curr[k].price
                  temp.exChangeName = curr[k].exChangeName
                  temp.isUp = curr[k].isUp
                  temp.upAndowm = curr[k].upAndowm

                  curr[k].price = curr[j].price
                  curr[k].exChangeName = curr[j].exChangeName
                  curr[k].isUp = curr[j].isUp
                  curr[k].upAndowm = curr[j].upAndowm

                  curr[j].price = temp.price
                  curr[j].exChangeName = temp.exChangeName
                  curr[j].isUp = temp.isUp
                  curr[j].upAndowm = temp.upAndowm
                }
              } else {
                if (up !== 'up') {
                  temp.price = curr[k].price
                  temp.exChangeName = curr[k].exChangeName
                  temp.isUp = curr[k].isUp
                  temp.upAndowm = curr[k].upAndowm

                  curr[k].price = curr[j].price
                  curr[k].exChangeName = curr[j].exChangeName
                  curr[k].isUp = curr[j].isUp
                  curr[k].upAndowm = curr[j].upAndowm

                  curr[j].price = temp.price
                  curr[j].exChangeName = temp.exChangeName
                  curr[j].isUp = temp.isUp
                  curr[j].upAndowm = temp.upAndowm
                }
              }
            }
          }
        }
      }
      return data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index";
.coinToCoin{
  .coin-nav{
    height:70px;
    background:@bg_color;
   >span{
     font-size: 18px;
     padding:0px 40px;
     line-height: 70px;
     display:inline-block;
     cursor: pointer;
     color:#fff;
   }
    >span:nth-child(1) {
      padding:0px 80px;
    }
    .selected{
      background:#284585;
    }
  }
  .container{
    margin-top:25px;
    width:100%;
    position:relative;
    min-height:1280px;
    .coin-list{
      width:345px;
      background:@bg_color;
      position:absolute;
      left:0px;
      top:0px;
      height:100%;
      background:@bg_color;
      >ul{
        width:100%;
        height:100%;
        li{
          cursor: pointer;
          line-height:52px;
          padding:0px 15px;
          >span:nth-child(2) {
            color:#fff;
          }
          >span:nth-child(3){
            float:right;
            color: #0aa7ff;
          }
        }
        .selected{
          background: #284585;
        }
      }
    }
    .coin-detail{
      width:100%;
      padding-left:360px;
      .coin-header{
        height:64px;
        width:100%;
        color:#fff;
        line-height: 64px;
        background:@mainColor;
        >span:nth-child(1) {
          font-size: 25px;
          padding-left:38px;
        }
        >span:nth-child(2) {
          margin-left:34px;
          font-size:20px;
        }
        >div:nth-child(3) {
          float:right;
          margin-right:95px;
          font-size:18px;
          >span{
            margin-left:80px;
            margin-right:5px;
            cursor: pointer;
          }
          .up{
            span:nth-child(1)::after{
              border-bottom: 6px solid #0aa7ff;
            }
            span:nth-child(2)::after{
              border-top: 6px solid rgba(255,255,255,0.3);
            }
          }
          .down{
            span:nth-child(1)::after{
              border-bottom: 6px solid rgba(255,255,255,0.3);
            }
            span:nth-child(2)::after{
              border-top: 6px solid #0aa7ff;
            }
          }
          .triangle{
            display:inline-block;
            cursor: pointer;
            span:nth-child(1)::after{
              content:" ";
              width: 0;
              height: 0;
              position:absolute;
              top:26px;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
            }
            span:nth-child(2)::after{
              content:" ";
              width: 0;
              height: 0;
              position:absolute;
              top:34px;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
            }
          }
        }
      }
      .exchange-list{
         width:100%;
         overflow: hidden;
         ul{
           margin:10px 0;
           width:5000px;
           height:120px;
           li{
             float:left;
             width:280px;
             height:100%;
             color:#fff;
             margin-right:10px;
             background:@bg_color;
             border-radius:3px;
             >div:nth-child(1) {
               margin-top:30px;
               margin-right:23px;
               font-size: 20px;
               text-align: right;
             }
             >div:nth-child(2) {
               margin-top:15px;
               span:nth-child(1) {
                 margin-left:56px;
                 font-size: 18px;
               }
               span:nth-child(2) {
                 font-size: 16px;
                 margin-right:23px;
                 float:right;
               }
             }
           }
           li:after{
             display:block;
             clear:both;
             content:"";
             visibility:hidden;
             height:0
           }
           .selected{
             background:#284da1;
           }
           li:hover{
             border:2px solid #284da1;
           }
         }
      }
    }
  }
}
.search{
  width: 100%;
  height: 51px;
  background-color: #273c6e;
  border-radius: 8px;
  border: solid 2px #304a87;
  position:relative;
  margin-bottom:10px;
  input{
    width:100%;
    height:100%;
    background-color: #273c6e;
    border:none;
    padding-right:90px;
    font-size: 17px;
    color: #a9c2fd;
    padding-left:25px;
    border-radius: 8px;
  }
  button{
    width: 88px;
    height: 43px;
    background-color: #4177fc;
    border-radius: 5px;
    border:none;
    color:#fff;
    font-size: 17px;
    position:absolute;
    right:2px;
    top:2px;
  }
}

.buy-input-list{
  margin-top:20px;
  >div:nth-child(1) {
    float:left;
    width:54%;
    .my-info{
      height:112px;
      background:@bg_color;
      display: flex;
      flex-wrap: wrap-reverse;
      >div{
        padding-top:26px;
        flex:1;
        color:#fff;
        >p:nth-child(2) {
          margin-top:18px;
        }
      }
      >div:nth-child(1){
        padding-left:38px;
      }
      >div:nth-child(2) {
        p{
          text-align: center;
        }
      }
      >div:nth-child(3) {
        text-align: right;
        padding-right:38px;
        a{
          color: #39f1ff;
        }
      }
    }
  }
  >div:nth-child(2) {
    padding-left:18px;
    float:left;
    width:46%;
    box-sizing: border-box;
  }
}

</style>
