<template>
  <div class="footer">
     <table>
        <thead>
          <tr>
            <td>工具</td>
            <td>关于</td>
            <td>条款说明 </td>
          </tr>
        </thead>
       <tbody>
         <tr>
           <td>数字资产介绍</td>
           <td>关于比链  </td>
           <td>用户协议 </td>
         </tr>
         <tr>
           <td>客户端下载</td>
           <td>联系我们  </td>
           <td>隐私条款 </td>
         </tr>
         <tr>
           <td>API文档</td>
           <td>加入我们  </td>
           <td>法律声明 </td>
         </tr>
         <tr>
           <td>帮助中心</td>
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
