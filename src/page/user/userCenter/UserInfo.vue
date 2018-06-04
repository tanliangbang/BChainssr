<template>
  <div class="auther">
    <div class="nomal">
      <span>邮箱验证:<i>648103576@qq.com</i></span>
      <span>设置</span>
    </div>
    <div class="nomal">
      <span>手机号码:<i>18721675880</i></span>
      <span><i class="grayColor">暂时无法修改</i></span>
    </div>
    <div class="nomal">
      <span>登入密码:<i>********</i></span>
      <span>修改</span>
    </div>

    <div class="nomal">
      <span>退出登入</span>
      <span v-on:click="loginOut">退出</span>
    </div>

    <div class="login-history">
      <div class="title">登入历史</div>
      <table>
        <tr><td width="25%">时间</td><td width="25%">登入方式</td><td width="25%">IP</td><td width="25%">状态</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
        <tr><td>2018-01-01 11:11:11</td><td>Web</td><td>IP:258.25.22.34</td><td>成功</td></tr>
      </table>
      <div class="page">
        <span>上一页</span> <span>返回</span> <span>下一页</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from './../../../service/getData'
import Tool from './../../../utils/Tool'
export default {
  name: 'Auther',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    loginOut () {
      let _this = this
      this.$mask.showAlert('确定要退出？', 'doubt', async function () {
        let data = await api.loginOut()
        if (data.data.code === 10000) {
          Tool.delCookie('ngtoken')
          _this.$store.dispatch('setUserInfo', null)
          _this.$router.push('/')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../style/var";
  .nomal{
    border-bottom: solid 1px #314b79;
    margin-top:15px;
    padding-left:30px;
    >span:nth-child(1) {
      font-size: 17px;
      height: 56px;
      line-height: 56px;
      color: #a9c2fd;
    }
    >span:nth-child(2){
      color: #39f1ff;
      font-size:16px;
      margin-right:25px;
      line-height:56px;
      float:right;
      cursor: pointer;
    }
    .grayColor{
      color: #5a78bf;
    }
  }
  .login-history{
    margin-top:272px;
    .title{
      width: 185px;
      height: 50px;
      background-color: #4177fc;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color:#fff;
      text-align: center;
      font-size: 18px;
      line-height: 50px;
    }
    table {
      margin-top:25px;
      width:100%;
      text-align: center;
      color:#fff;
      line-height:50px;
      background:#284585;
      td{
        border-bottom:1px solid @bg_color;
      }
      tr:last-child{
        td{
          border-bottom:none;
        }
      }
    }
  }
  .page{
    margin:30px 0px;
    text-align: center;
    color:#fff;
    >span{
      margin-right:30px;
    }
  }
</style>
