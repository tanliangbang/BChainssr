<template>
  <div class="addPayWay" v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
     <div>
        <div class="nav"><router-link to="userCenter?type=payWay">{{$t("lang.userCenter.paymentMethod")}}</router-link> >
          <span>{{$t("lang.userCenter.addCollection")}}</span></div>
        <form>
           <p>{{$t("lang.userCenter.addPayWay")}}</p>
           <div class="nomalInput">
             <span>{{$t("lang.userCenter.realName")}}:</span><span>胡恒</span>
           </div>
           <div class="nomalInput">
             <span>{{$t("lang.userCenter.idNumber")}}:</span><span>43055455667****2212</span>
           </div>
          <div class="nomalInput">
            <span>{{$t("lang.userCenter.paymentMethod")}}:</span>
            <select v-model="payWay" v-on:change="changePayWay">
              <option value="bankCard">{{$t("lang.userCenter.pay3")}}</option>
              <option value="alipay">{{$t("lang.userCenter.pay2")}}</option>
              <option value="weChat">{{$t("lang.userCenter.pay1")}}</option></select>
          </div>

         <div v-if="payWay==='bankCard'">
           <div class="nomalInput">
             <span>{{$t("lang.userCenter.bankName")}}:</span>
             <input v-model="form.bankDeposit"  :placeholder="$t('lang.userCenter.bankName')" />
             <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
           </div>
           <div class="nomalInput">
             <span>{{$t("lang.userCenter.accountBranch")}}:</span><input type="text" :placeholder="$t('lang.userCenter.accountBranch')">
           </div>
           <div class="nomalInput">
             <span>{{$t("lang.userCenter.bankNum")}}:</span><input type="text" :placeholder="$t('lang.userCenter.bankNum')">
           </div>
         </div>

          <div v-if="payWay==='alipay'">
            <div class="nomalInput">
              <span>{{$t("lang.userCenter.pay2")}}:</span><input type="text" :placeholder="$t('lang.userCenter.pay2')">
            </div>
            <div class="nomalInput">
              <span>{{$t("lang.userCenter.payCode")}}:</span>
              <div class="upload">
                <div class="addImg">
                  <img src="../../../../static/img/add.png">
                  <p>{{$t("lang.userCenter.addPrompt1")}}{{$t("lang.userCenter.pay2")}}{{$t("lang.userCenter.addPrompt2")}}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="payWay==='weChat'">
            <div class="nomalInput">
              <span>{{$t("lang.userCenter.pay1")}}:</span><input type="text" :placeholder="$t('lang.userCenter.pay1')">
            </div>
            <div class="nomalInput">
              <span>{{$t("lang.userCenter.payCode")}}:</span>
              <div class="upload">
                <div class="addImg">
                  <img src="../../../../static/img/add.png">
                  <p>{{$t("lang.userCenter.addPrompt1")}}{{$t("lang.userCenter.pay1")}}{{$t("lang.userCenter.addPrompt2")}}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <a class="commit">{{$t("lang.userCenter.commit")}}</a>
          </div>
        </form>
     </div>
  </div>
</template>

<script>
import Tool from './../../../utils/Tool'
export default {
  name: 'AddPayWay',
  components: {
  },
  data () {
    return {
      payWay: 'weChat',
      form: {
        alipayAccount: '',
        wechatAccount: '',
        bankAccount: '',
        bankDeposit: '',
        bankBranch: '',
        alipayQRcode: '',
        wechatQRcode: ''
      }
    }
  },
  created () {
  },
  methods: {
    changePayWay () {
      console.log(this.payWay)
    },
    checkBankDeposit (bool) {
      let bankDeposit = Tool.trim(this.form.bankDeposit)
      if (bankDeposit === '') {
        if (bool) {
          return false
        }
        this.error.bankDeposit = this.$t('lang.userCenter.placeholdName')
      } else {
        this.error.bankDeposit = ''
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../style/var";
  @import "../../../style/common";
  .addPayWay{
    margin:20px;
    background:@bg_color;
    >div{
      margin:0px 340px;
      .nav{
        font-size:18px;
        padding-top:42px;
        a{
          color: #0088ff;
        }
      }
      >form{
        width:557px;
        margin:50px auto;
        padding-top:44px;
        padding-bottom:84px;
        p:nth-child(1) {
          font-size: 16px;
          text-align: center;
          margin-bottom:30px;
        }
        .nomalInput{
          span:nth-child(1){
            width:100px;
            text-align: right;
            line-height: 50px;
            display:inline-block;
            margin-right:28px;
            margin-bottom:14px;
          }
          >span:nth-child(2){
            border-bottom:2px solid #2f4988;
            line-height: 50px;
            width:420px;
            display:inline-block;
          }
          >select{
            width:420px;
            height:50px;
            background-color: #273c6e;
            border: solid 2px #304a87;
            color:#fff;
            font-size:16px;
            border-radius:8px;
            padding-left:20px;
          }
          >input{
            width:420px;
            height:50px;
            background-color: #273c6e;
            border: solid 2px #304a87;
            color:#fff;
            font-size:16px;
            border-radius:8px;
            padding-left:20px;
          }
          .upload{
            display:inline-block;
            width:420px;
            height:150px;
            border: solid 2px #4177fc;
            color: #a9c2fd;
            cursor: pointer;
            border-radius: 8px;
            vertical-align: top;
            text-align: center;
            .addImg{
              font-size:12px;
              img{
                margin-top:40px;
              }
              p{
                margin-top:10px;
              }
            }
          }
        }
        .commit{
          width: 260px;
          height: 42px;
          background-image: linear-gradient(176deg, #245bfc 0%, #00a7ff 100%);
          border-radius: 93px;
          display:block;
          margin:63px auto 0;
          line-height: 42px;
          text-align: center;
        }
      }
    }
  }
</style>
