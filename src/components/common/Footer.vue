<template>
  <div class="footer">
     <div>
       <ul>
         <li>{{$t("lang.bottom.tools")}}</li>
         <li>{{$t("lang.bottom.digital")}}</li>
         <li>{{$t("lang.bottom.clientDown")}}</li>
         <li>{{$t("lang.bottom.doc")}}</li>
         <li>{{$t("lang.bottom.help")}}</li>

       </ul>
       <ul>
         <li>{{$t("lang.bottom.aboutUs")}}</li>
         <li>{{$t("lang.bottom.aboutBilian")}}  </li>
         <li>{{$t("lang.bottom.contactUs")}}  </li>
         <li>{{$t("lang.bottom.join")}}  </li>
       </ul>
       <ul>
         <li>{{$t("lang.bottom.clauseInstruct")}} </li>
         <li>{{$t("lang.bottom.legalStatement")}}  </li>
         <li>{{$t("lang.bottom.privacyPolicy")}} </li>
         <li>{{$t("lang.bottom.termsOfUser")}} </li>
       </ul>
     </div>
     <div>©2018 BILIAN</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @import "../../style/common.less";
  .footer{
    width:100%;
    background:@mainColor;
    text-align: center;
    clear:both;
    >div:nth-child(1) {
      width:800px;
      padding:50px 0px;
      color:#fff;
      margin:0px auto;
      text-align: center;
      display:flex;
      flex-wrap: wrap-reverse;
      >ul{
        flex:1;
        li{
          font-size:12px;
          line-height: 20px;
        }
      }
    }
    >div:nth-child(2){
      color:#fff;
      padding-bottom:20px;
    }
  }
</style>
