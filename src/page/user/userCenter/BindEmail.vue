<template>
  <form class="bindEmail" v-on:keyup="emailPassDown">
    <p>
      {{$t('lang.form.successPrompt')}}<br/>
      {{$t('lang.form.bindEmailPrompt')}}
    </p>
    <div class="code">
      <input type="text" v-on:focus="showDel('email')" v-on:blur="checkEmail()" v-model="email" :placeholder="$t('lang.form.emailPrompt')"/>
      <i :class="rules.email.class"  v-on:click="delEmail('email')">{{rules.email.message}}</i>
      <span v-on:click="getEmailCode()" ref="sendEmail">{{$t('lang.form.getCode')}}</span>
    </div>
    <div class="codeInput">
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt1')"  type="text"/>
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt2')" type="text"/>
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt3')" type="text"/>
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt4')" type="text"/>
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt5')" type="text"/>
      <input v-on:keyup="codeKeyup($event)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt6')"  type="text"/>
    </div>

    <div v-if="!verifyPass" class="sbutton">
      <a class="no_button">{{$t('lang.form.submit')}}</a>
    </div>
    <div v-if="verifyPass" class="sbutton">
      <a class="ok_button" v-on:click="bindEmail">{{$t('lang.form.submit')}}</a>
    </div>
    <div class="login_button">
      <router-link class="border_button" to="login">{{$t('lang.form.returnHome')}}</router-link>
    </div>
  </form>
</template>

<script>
import Tool from '../../../utils/Tool'
import FormFun from '../../../utils/FormFun'

import * as api from '../../../service/getData'
export default {
  name: 'Detail',
  components: {
  },
  data () {
    return {
      email: '',
      codeSend: false,
      verifyPass: false,
      codeValue: '',
      rules: {
        email: {
          message: '',
          class: ''
        }
      }
    }
  },
  created () {
  },
  methods: {
    delEmail () {
      this.email = ''
    },
    showDel (field) {
      this.rules[field].class = 'del'
      this.rules[field].message = ''
    },
    checkEmail (bool) {
      if (this.email === '') {
        if (!bool) {
          this.rules.email.class = 'del'
          this.rules.email.message = this.$t('lang.form.emailPrompt')
        }
        return false
      } else if (!Tool.isEmail(this.email)) {
        if (!bool) {
          this.rules.email.class = 'del'
          this.rules.email.message = this.$t('lang.form.emailFormatError')
          return false
        }
      } else {
        this.rules.email.class = 'pass'
        this.rules.email.message = ''
        return true
      }
    },
    emailPassDown () {
      if (this.checkEmail(true) && this.codeSend && this.codeValue.length === 6) {
        this.verifyPass = true
      } else {
        this.verifyPass = false
      }
    },
    bindEmail () {
      let params = {
        email: this.email,
        code: this.codeValue
      }
      let _this = this
      api.bindEmail(params).then(function (res) {
        if (res.status === 200) {
          this.$store.dispatch('setUserInfo', res.data.userinfo)
          _this.$prompt.success(_this.$t('lang.errorPrompt.bindSucess'))
        } else {
          _this.$prompt.error(_this.$t('lang.errorPrompt.' + res.message))
        }
      })
    },
    codeKeyup (event) {
      let val = event.target.value
      let regPos = /^\d+(\.\d+)?$/
      if (regPos.test(val)) {
        this.codeValue = this.codeValue + val
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus()
        } else {
          event.target.blur()
        }
      } else {
        event.target.value = ''
      }
    },
    clearVal (event) {
      event.target.value = ''
    },
    getEmailCode () {
      let _this = this
      if (!this.checkEmail(true)) {
        return
      }
      if (this.$refs.sendEmail.innerHTML !== this.$t('lang.form.getCode')) {
        return
      }
      let currNode = _this.$refs.sendEmail
      FormFun.sendCodeed(_this, currNode)
      api.getEmailCode({email: this.email}).then(function (res) {
        if (res.status === 200) {
          Tool.setCookie('email_token', res.data.email_token)
          _this.codeSend = true
        } else {
          _this.$prompt.error(_this.$t('lang.form.sendFail'))
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../style/common';
@import './../index';
@import './../../../style/form.less';
.bindEmail {
  padding-top: 100px;
  > p:nth-child(1) {
    text-align: center;
    font-size: 20px;
    color: #fff;
    letter-spacing: 0px;
    margin: 0 0 50px 0;
  }
  > p:nth-child(2) {
    margin-top: 75px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0px;
  }
  .to_button {
    margin-top: 15px;
    text-align: center;
  }
  .sbutton{
    margin-top:50px;
    text-align: center;
  }
  .login_button{
    margin-top:18px;
    text-align: center;
  }
}

</style>
