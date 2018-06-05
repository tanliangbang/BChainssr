<template>
  <div class="footer">
     <table>
        <thead>
          <tr>
            <td>{{$t("lang.bottom.tools")}}</td>
            <td>{{$t("lang.bottom.aboutUs")}}</td>
            <td>{{$t("lang.bottom.clauseInstruct")}} </td>
          </tr>
        </thead>
       <tbody>
         <tr>
           <td>{{$t("lang.bottom.digital")}}</td>
           <td>{{$t("lang.bottom.aboutBilian")}}  </td>
           <td>{{$t("lang.bottom.termsOfUser")}} </td>
         </tr>
         <tr>
           <td>{{$t("lang.bottom.clientDown")}}</td>
           <td>{{$t("lang.bottom.contactUs")}}  </td>
           <td>{{$t("lang.bottom.privacyPolicy")}} </td>
         </tr>
         <tr>
           <td>{{$t("lang.bottom.doc")}}</td>
           <td>{{$t("lang.bottom.join")}}  </td>
           <td>{{$t("lang.bottom.legalStatement")}}  </td>
         </tr>
         <tr>
           <td>{{$t("lang.bottom.help")}}</td>
         </tr>

       </tbody>
     </table>
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
    table{
       width:800px;
       padding:50px 0px;
       color:#fff;
       margin:0px auto;
       text-align: center;

      thead{
         font-size:14px;
       }
       tbody{
         font-size:12px;
         tr{
           line-height: 20px;
         }
       }
     }
    >div{
      color:#fff;
      padding-bottom:20px;
    }
  }
</style>
