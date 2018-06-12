<template>
  <section class="login">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
           <form class="login_form" v-on:keyup="onPageDown">
             <p>{{$t("lang.form.loginTitle")}}</p>
             <div class="nomalInput">
               <input v-model="loginForm.phone" autoComplete="off" :placeholder="$t('lang.form.phonePrompt')" v-on:focus="showDel('phone')" v-on:blur="checkPhone()"/>
               <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
             </div>
             <div class="nomalInput password">
               <input v-model="loginForm.password" autoComplete="off" :placeholder="$t('lang.form.passPrompt')" v-on:focus="showDel('password')" v-on:blur="checkPassword()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.password.class"  v-on:click="delContent('password')">{{rules.password.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <p :class="error?'error':'visiable'">{{errorMessage}}</p>
             <div v-if="!ispass" class="login_button">
               <a class="no_button" v-on:click="showError">{{$t("lang.form.loginSubmit")}}</a>
             </div>
             <div v-if="ispass" class="login_button">
               <a class="ok_button" v-on:click="login">{{$t("lang.form.loginSubmit")}}</a>
             </div>
             <div class="forgetPassword">
               <router-link to="foundPassword">{{$t("lang.form.forgot")}}</router-link>
             </div>
             <div class="registLink">
               <a>{{$t("lang.form.registTitle")}}</a>
             </div>
           </form>
      </div>
  </section>
</template>

<script>
import * as api from '../../service/getData'
import Tool from '../../utils/Tool'
import FormFun from '../../utils/FormFun'
if (typeof window !== 'undefined') {
  require('../../../static/greetest/gt')
}
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      error: false,
      errorMessage: this.$t('lang.form.pleaseLoginInfo'),
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

  },
  mounted () {
    this.initDate()
  },
  methods: {
    async initDate () {
      let data = await api.getGreetest()
      data = data.data
      let _this = this
      FormFun.initGreetest(_this, data, function (captchaObj) {
        _this.captchaObj = captchaObj
        captchaObj.onSuccess(function () {
          let result = captchaObj.getValidate()
          result.gee_token = data.gee_token
          result.account = _this.loginForm.phone
          result.pass = Tool.md5(_this.loginForm.password)
          api.accounts(result).then(function (res) {
            if (res.status === 200) {
              // Tool.setCookie('ngtoken', res.data.ngtoken)
              _this.$store.dispatch('setUserInfo', res.data.userinfo)
              _this.$router.push('/')
            } else {
              _this.error = true
              _this.errorMessage = _this.$t('lang.errorPrompt.' + res.message)
              _this.ispass = true
            }
          })
        })
      })
    },
    showpass () {
      this.isShowpass = !this.isShowpass
    },
    delContent (field) {
      this.loginForm[field] = ''
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
          this.rules.phone.message = this.$t('lang.from.phonePrompt')
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
          this.rules.password.message = this.$t('lang.form.passPrompt')
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
      this.errorMessage = this.$t('lang.form.pleaseLoginInfo')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../style/common';
  @import './index';
  @import '../../style/form';
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
