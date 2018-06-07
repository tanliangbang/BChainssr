<template>
  <section class="foundPassword">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
        <div class="nav_found">
          <a v-on:click="toChange('phone')" :class="foundWay === 'phone'?'select':''">手机找回密码</a>
          <a v-on:click="toChange('email')" :class="foundWay === 'email'?'select':''">邮箱找回密码</a></div>

        <form class="phone_found"  v-on:keyup="onPageDown">
            <div v-if="foundWay === 'phone'" >
              <div class="nomalInput">
                <input :placeholder="$t('lang.form.phonePrompt')"  v-model="foundPassForm.phone" v-on:focus="showDel('phone')" v-on:blur="checkPhone()" type="text"/>
                <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
                <div class="userExist" v-if="userExist">
                  <i>{{$t('lang.form.userExsit')}}</i><router-link to="login">{{$t('lang.form.goLogin')}}</router-link>
                </div>
              </div>
              <div class="code">
                <input type="text" v-on:focus="showDel('code')" v-on:blur="checkCode()" v-model="foundPassForm.code" :placeholder="$t('lang.form.pleaseEnterCode')"/>
                <i :class="rules.code.class"  v-on:click="delContent('code')">{{rules.code.message}}</i>
                <span v-on:click="getCode()" ref="send">{{$t('lang.form.getCode')}}</span>
              </div>
            </div>

          <div v-if="foundWay === 'email'" >
            <div class="nomalInput">
              <input :placeholder="$t('lang.form.emailPrompt')"  v-model="foundPassForm.email" v-on:focus="showDel('email')" v-on:blur="checkEmail()" type="text"/>
              <i :class="rules.email.class" v-on:click="delContent('email')" >{{rules.email.message}}</i>
            </div>
            <div class="code">
              <input type="text" v-on:focus="showDel('emailCode')" v-on:blur="checkCode()" v-model="foundPassForm.emailCode" :placeholder="$t('lang.form.pleaseEnterCode')"/>
              <i :class="rules.code.class"  v-on:click="delContent('code')">{{rules.code.message}}</i>
              <span v-on:click="getEmailCode()" ref="sendEmail">{{$t('lang.form.getCode')}}</span>
            </div>
          </div>

            <div class="nomalInput password">
              <input :placeholder="$t('lang.form.passPrompt')" v-model="foundPassForm.password" v-on:blur="checkPass()" :type="isShowpass?'text':'password'"/>
              <i :class="rules.password.class"  v-on:click="delContent('password')">{{rules.password.message}}</i>
              <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
            </div>
            <div class="nomalInput password">
              <input :placeholder="$t('lang.form.repassPrompt')" v-model="foundPassForm.repassword" v-on:blur="checkRePass()" :type="isShowpass?'text':'password'"/>
              <i :class="rules.repassword.class"  v-on:click="delContent('repassword')">{{rules.repassword.message}}</i>
              <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
            </div>
            <p :class="error?'registFial':'visiable'">{{errorMessage}}</p>
            <div v-if="!ispass" class="rbutton">
              <a class="no_button">{{$t('lang.form.next')}}</a>
            </div>
            <div v-if="ispass" class="rbutton">
              <a v-on:click="submit"  class="ok_button">{{$t('lang.form.next')}}</a>
            </div>
          </form>
      </div>
  </section>
</template>

<script>
import Tool from '../../utils/Tool'
import FormFun from '../../utils/FormFun'
import * as api from '../../service/getData'
if (typeof window !== 'undefined') {
  require('../../../static/greetest/gt')
}
export default {
  name: 'FoundPassword',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      step: 1,
      isSendCode: false,
      captchaObj: null,
      tokenId: null,
      phone: null,
      error: false,
      errorMessage: this.$t('lang.form.registFail'),
      userExist: false,
      foundWay: 'phone',
      foundPassForm: {
        phone: '',
        code: '',
        email: '',
        emailCode: '',
        password: '',
        repassword: '',
        recommed: ''
      },
      rules: {
        phone: {
          message: '',
          class: ''
        },
        code: {
          message: '',
          class: ''
        },
        password: {
          message: '',
          class: ''
        },
        repassword: {
          message: '',
          class: ''
        },
        email: {
          message: '',
          class: ''
        },
        emailCode: {
          message: '',
          class: ''
        }
      }
    }
  },
  created () {
  },
  mounted () {
    window.scrollTo(0, 0)
    this.initDate()
  },
  methods: {
    async initDate () {
      let data = await api.getGreetest()
      let _this = this
      window.initGeetest({
        // 以下配置参数来自服务端 SDK
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: data.new_captcha,
        product: 'bind'
      }, function (captchaObj) {
        _this.captchaObj = captchaObj
        captchaObj.onSuccess(function () {
          let result = captchaObj.getValidate()
          result.mobile = _this.foundPassForm.phone
          _this.phone = _this.foundPassForm.phone
          result.gee_token = data.gee_token
          api.sendSMS(result).then(function (res) {
            if (res.data.code === 10001) {
              _this.userExist = true
              return
            }
            if (!res.tokenId) {
              _this.$prompt.error(_this.$t('lang.form.sendFail'))
              return
            }
            _this.tokenId = res.tokenId
            _this.isSendCode = true
            let currNode = _this.$refs.send
            FormFun.sendCodeed(_this, currNode)
          })
        })
      })
    },
    showDel (field) {
      this.rules[field].class = 'del'
      this.rules[field].message = ''
    },
    toChange (str) {
      this.foundWay = str
    },
    delContent (field) {
      this.foundPassForm[field] = ''
    },
    checkPhone (bool) {
      this.userExist = false
      if (this.foundPassForm.phone === '') {
        if (!bool) {
          this.rules.phone.class = 'del'
          this.rules.phone.message = this.$t('lang.form.phonePrompt')
        }
        return false
      }
      if (!Tool.isPoneAvailable(this.foundPassForm.phone)) {
        if (!bool) {
          this.rules.phone.class = 'del'
          this.rules.phone.message = this.$t('lang.form.phoneError')
        }
        return false
      } else {
        this.rules.phone.class = 'pass'
        this.rules.phone.message = ''
        return true
      }
    },
    checkCode (bool) {
      if (!this.isSendCode) {
        if (!bool) {
          this.rules.code.class = 'del'
          this.rules.code.message = this.$t('lang.form.codePrompt')
        }
        return false
      }
      if (this.foundPassForm.code === '') {
        if (!bool) {
          this.rules.code.class = 'del'
          this.rules.code.message = this.$t('lang.form.codePrompt')
        }
        return false
      } else {
        this.rules.code.class = 'pass'
        this.rules.code.message = ''
        return true
      }
    },
    checkPass (bool) {
      let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
      if (this.foundPassForm.password === '') {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = this.$t('lang.form.passPrompt')
        }
        return false
      } else if (this.foundPassForm.password.length < 6) {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = this.$t('lang.form.passLast6')
        }
        return false
      } else if (!reg.test(this.foundPassForm.password)) {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = this.$t('lang.form.numberAndLetter')
        }
        return false
      } else {
        this.rules.password.class = 'pass'
        this.rules.password.message = ''
        return true
      }
    },
    checkRePass (bool) {
      if (this.foundPassForm.repassword === '') {
        if (!bool) {
          this.rules.repassword.class = 'del'
          this.rules.repassword.message = this.$t('lang.form.repassPrompt')
        }
        return false
      } else if (this.foundPassForm.password !== this.foundPassForm.repassword) {
        if (!bool) {
          this.rules.repassword.class = 'del'
          this.rules.repassword.message = this.$t('lang.form.passInconsistent')
        }
        return false
      } else {
        this.rules.repassword.class = 'pass'
        this.rules.repassword.message = ''
        return true
      }
    },
    showpass () {
      this.isShowpass = !this.isShowpass
    },
    onPageDown () {
      this.error = false
      if (this.checkPhone(true) && this.checkCode(true) && this.checkPass(true) && this.checkRePass(true)) {
        this.ispass = true
      } else {
        this.ispass = false
      }
    },
    submit () {
      let params = {
        mobile: this.phone,
        tokenId: this.tokenId,
        code: this.foundPassForm.code,
        pass: Tool.md5(this.foundPassForm.password),
        referee: this.foundPassForm.recommed
      }
      let _this = this
      this.ispass = false
      api.regist(params).then(function (res) {
        if (res.data.code === 10000 && res.ngtoken) {
          Tool.setCookie('ngtoken', res.ngtoken)
          _this.$store.dispatch('setUserInfo', res.userinfo)
          _this.$router.push('/')
          _this.step = 2
        } else {
          if (res.data.code === 10002) {
            _this.error = true
            _this.errorMessage = _this.$t('lang.form.codeError')
          } else {
            _this.error = true
            _this.errorMessage = _this.$t('lang.form.registFail')
          }

          _this.ispass = true
        }
      })
    },
    getCode () {
      if (this.checkPhone() && this.$refs.send.innerHTML === this.$t('lang.form.getCode')) {
        this.captchaObj.verify()
      }
    },
    clearVal (event) {
      event.target.value = ''
    },
    checkEmail (bool) {
      if (this.foundPassForm.email === '') {
        if (!bool) {
          this.rules.email.class = 'del'
          this.rules.email.message = this.$t('lang.form.emailPrompt')
        }
        return false
      } else if (!Tool.isEmail(this.foundPassForm.email)) {
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
      api.getEmailCode({email: this.foundPassForm.email}).then(function (res) {
        _this.codeSend = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../style/common';
  @import './index';
  .email_form{
    .toEmail{
      text-align: center;
      margin-top:10px;
    }
    p{
      text-align: center;
      color:#fff;
      font-size:14px;
      margin-top:36px;
    }
  }
  .nav_found{
    padding-top:105px;
    text-align: center;
    margin-bottom:38px;
    a{
      display:inline-block;
      width: 120px;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height:32px;
      color: #ffffff;
      margin-right:68px;
      position:relative;
      cursor: pointer;
    }
    .select:after{
      content:' ';
      position:absolute;
      width:100%;
      height:2px;
      bottom:0px;
      left:0px;
      background-image: linear-gradient(90deg,
      #245bfc 0%,
      #00a7ff 100%);
    }
  }
  .phone_found{
    .rbutton {
      text-align: center;
      margin-top:38px;
      margin-bottom:38px;
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
  .visiable{
    visibility: hidden;
  }
</style>
