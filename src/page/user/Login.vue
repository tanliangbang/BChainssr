<template>
  <section class="login">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
           <form class="login_form" v-on:keyup="onPageDown">
             <p>登入一账通</p>
             <div class="nomalInput">
               <input v-model="loginForm.phone" placeholder="输入手机号码" v-on:focus="showDel('phone')" v-on:blur="checkPhone()"/>
               <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
             </div>
             <div class="nomalInput password">
               <input v-model="loginForm.password" placeholder="输入密码" v-on:focus="showDel('password')" v-on:blur="checkPassword()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.password.class"  v-on:click="delContent('password')">{{rules.password.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <p :class="error?'error':'visiable'">{{errorMessage}}</p>
             <div v-if="!ispass" class="login_button">
               <a class="no_button" v-on:click="showError">登入</a>
             </div>
             <div v-if="ispass" class="login_button">
               <a class="ok_button" v-on:click="login">登入</a>
             </div>
             <div class="forgetPassword">
               <router-link to="foundPassword">忘记密码</router-link>
             </div>
             <div class="registLink">
               <a>注册一帐通</a>
             </div>
           </form>
      </div>
  </section>
</template>

<script>
import '../../../static/greetest/gt'
import * as api from '../../service/getData'
import Tool from '../../utils/Tool'
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      error: false,
      errorMessage: '请输入登入信息',
      loginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: {
          message: '',
          class: ''
        },
        password: {
          message: '',
          class: ''
        }
      }
    }
  },
  created () {
    this.initDate()
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    async initDate () {
      let data = await api.getGreetest()
      let that = this
      console.log(data)
      window.initGeetest({
        // 以下配置参数来自服务端 SDK
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: data.new_captcha,
        product: 'bind'
      }, function (captchaObj) {
        that.captchaObj = captchaObj
        captchaObj.onSuccess(function () {
          let result = captchaObj.getValidate()
          result.gee_token = data.gee_token
          result.account = that.loginForm.phone
          result.pass = Tool.md5(that.loginForm.password)
          api.accounts(result).then(function (res) {
            if (res.data.code === 10000 && res.ngtoken) {
              Tool.setCookie('ngtoken', res.ngtoken)
              that.$store.dispatch('setUserInfo', res.userinfo)
              that.$router.push('/')
            } else {
              that.error = true
              that.errorMessage = '用户名或密码错误'
              that.ispass = true
            }
          })
        })
      })
    },
    showpass () {
      this.isShowpass = !this.isShowpass
    },
    showDel (field) {
      this.error = false
      this.rules[field].class = 'del'
      this.rules[field].message = ''
    },
    checkPhone (bool) {
      if (this.loginForm.phone === '') {
        if (!bool) {
          this.rules.phone.class = 'del'
          this.rules.phone.message = '请输入手机号码'
        }
        return false
      } else {
        this.rules.phone.class = ''
        return true
      }
    },
    checkPassword (bool) {
      if (this.loginForm.password === '') {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = '请输入手机号码'
        }
        return false
      } else {
        this.rules.password.class = ''
        return true
      }
    },
    onPageDown ($event) {
      if (this.checkPhone(true) && this.checkPassword(true)) {
        this.ispass = true
        if ($event.keyCode === 13) {
          this.captchaObj.verify()
        }
      } else {
        this.ispass = false
      }
    },
    login () {
      /* this.$store.dispatch('setUserInfo', {mobile: '18721675880'})
      this.$router.push('/') */
      if (this.checkPhone(true) && this.checkPassword(true)) {
        this.ispass = false
        this.captchaObj.verify()
      }
    },
    showError () {
      this.error = true
      this.errorMessage = '请输入登入信息'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../style/common';
  @import './index';
  .login_form{
        padding-top:106px;
        p:nth-child(1){
          text-align: center;
          font-size: 20px;
          color: #ffffff;
          margin:0 0 38px 0;
        }
        .nomalInput{
          margin-bottom:24px;
        }
        .login_button{
          margin-top:10px;
          text-align: center;
        }
        .forgetPassword{
          text-align: center;
          margin-top:19px;
          a{
            font-size:14px;
            color: #0088ff;
          }
          a:hover{
            color: #269aff;
          }
        }
        .registLink{
          margin-top:40px;
          text-align: center;
          margin-bottom:38px;
          a{
            font-size:18px;
            color:#fff;
          }
         }
        .password{
          i:nth-child(2){
            right:40px;
          }
          i:nth-child(3){
            top:22px;
          }
        }
        .error{
          font-size: 14px;
          color: #39f1ff;
          text-align: center;
          margin-top:30px;
        }
        .visiable {
          visibility: hidden;
        }
  }
</style>
