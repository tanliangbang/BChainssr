<template>
  <div class="addPayWay" v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
     <div>
        <div class="nav"><router-link to="userCenter?type=payWay">收款方式</router-link> > <span>添加支付方式</span></div>
        <form>
           <p>添加支付方式</p>
           <div class="nomalInput">
             <span>真实姓名:</span><span>胡恒</span>
           </div>
           <div class="nomalInput">
             <span>身份证号码:</span><span>43055455667****2212</span>
           </div>
          <div class="nomalInput">
            <span>支付方式:</span>
            <select v-model="payForm.payWay" v-on:change="changePayWay"><option value="bankCard">银行卡</option><option value="alipay">支付宝</option><option value="weChat">微信</option></select>
          </div>

         <div v-if="payForm.payWay==='bankCard'">
           <div class="nomalInput">
             <span>开户银行:</span><input type="text" placeholder="开户银行">
           </div>
           <div class="nomalInput">
             <span>开户支行:</span><input type="text" placeholder="开户支行">
           </div>
           <div class="nomalInput">
             <span>银行卡账号:</span><input type="text" placeholder="银行卡账号">
           </div>
         </div>

          <div v-if="payForm.payWay==='alipay'">
            <div class="nomalInput">
              <span>支付宝账号:</span><input type="text" placeholder="支付宝账号">
            </div>
            <div class="nomalInput">
              <span>收款二维码:</span>
              <div class="upload">
                <div class="addImg">
                  <img src="../../../../static/img/add.png">
                  <p>请上传您的支付宝收款二维码图片</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="payForm.payWay==='weChat'">
            <div class="nomalInput">
              <span>微信账号:</span><input type="text" placeholder="微信账号">
            </div>
            <div class="nomalInput">
              <span>微信账号:</span>
              <div class="upload">
                <div class="addImg">
                  <img src="../../../../static/img/add.png">
                  <p>请上传您的微信收款二维码图片</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <a class="commit">提交</a>
          </div>
        </form>
     </div>
  </div>
</template>

<script>
export default {
  name: 'AddPayWay',
  components: {
  },
  data () {
    return {
      payForm: {
        payWay: 'weChat'
      }
    }
  },
  created () {
  },
  methods: {
    changePayWay () {
      console.log(this.payForm.payWay)
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
