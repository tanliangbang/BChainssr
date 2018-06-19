<template>
  <div class="entrustManage mainMg" v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
      <div class="header">
         <div>
             <a v-on:click="changeStatus(1)" :class="status===1?'selected':''">{{$t("lang.entrustManage.processContracts")}}</a>
             <a v-on:click="changeStatus(2)" :class="status===2?'selected':''">{{$t("lang.entrustManage.historyContracts")}}</a>
         </div>
        <div class="opera">
           <input type="checkbox">{{$t("lang.entrustManage.onlyShowFinished")}}
           <input type="text">
           <button>{{$t("lang.entrustManage.search")}}</button>
        </div>
      </div>

      <table cellspacing="0">
         <tr>
           <th>{{$t("lang.entrustManage.time")}}</th>
           <th>{{$t("lang.entrustManage.tradeType")}}</th>
           <th>{{$t("lang.entrustManage.coinType")}}</th>
           <th>{{$t("lang.entrustManage.direction")}}</th>
           <th>{{$t("lang.entrustManage.price")}}</th>
           <th>{{$t("lang.entrustManage.volume")}}</th>
           <th>{{$t("lang.entrustManage.contractValue")}}</th>
           <th>{{$t("lang.entrustManage.contractState")}}</th>
           <th>{{$t("lang.entrustManage.exchange")}}</th>
           <th>{{$t("lang.entrustManage.control")}}</th>
         </tr>

        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
        <tr>
          <td>20180909</td>
          <td>卖出</td>
          <td>BTC/USDT</td>
          <td>卖出</td>
          <td>250212</td>
          <td>13256</td>
          <td>295665</td>
          <td>已成交</td>
          <td>火币网</td>
          <td>删除</td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'EntrustManage',
  components: {
  },
  data () {
    return {
      status: 1
    }
  },
  created () {
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeStatus (num) {
      this.status = num
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../style/var";
  .entrustManage{
    padding:100px;
    background:@bg_color;
    font-size: 14px;
    .header {
      border-bottom: 1px solid #4177fc;
      height:50px;
      > div:nth-child(1) {
        width: 369px;
        height: 50px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        float:left;
        flex-wrap: wrap-reverse;
        border: 1px solid #4177fc;
        border-bottom: none;
        .selected {
          background: #4177fc;
        }
        a:nth-child(1) {
          border-top-left-radius: 8px;
        }
        a:nth-child(2) {
          border-top-right-radius: 8px;
        }
        a {
          line-height: 50px;
          text-align: center;
          flex: 1;
          cursor: pointer;
        }
      }
      .opera{
        float:right;
        input[type^="checkbox"]{
          content:'';
          width:0px;
          height:0px;
          display:inline-block;
          position:relative;
          margin-right:20px;
        }
        input[type^="checkbox"]:after{
          content:'';
          top:-16px;
          left:-11px;
          width:22px;
          height:22px;
          position:absolute;
        //  background:url('../../../static/img/check.png')
        }
        input[type^="checkbox"]:checked:after{
          top:-16px;
          left:-11px;
          width:22px;
          height:22px;
          position:absolute;
        //  background:url('../../../static/img/checked.png')
        }
        input[type^="text"]{
          width: 216px;
          height: 36px;
          background-color: #273c6e;
          border-radius: 8px;
          border: solid 2px #304a87;
          margin-left:20px;
          margin-right:20px;
        }
        button{
          width: 88px;
          height: 36px;
          background-color: #4177fc;
          border-radius: 5px;
          line-height: 36px;
          text-align: center;
          border:none;
          color:#fff;
        }
      }
    }

    table{
      width:100%;
      text-align: left;
      margin-top:25px;
      tr{
        th{
          border-bottom:2px solid @bg_color;
        }
        td:nth-child(1), th:nth-child(1){
          padding-left:30px;
        }
        td{
          border-bottom:1px solid @bg_color;
        }
        td:last-child{
          color:#00eeff;
        }

      }
       tr{
         background:#284585;
         line-height: 50px;
       }
    }

  }

</style>
