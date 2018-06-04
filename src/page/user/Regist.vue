<template>
  <section class="regist">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
          <form class="step1" v-if="step === 1" v-on:keyup="onPageDown">
             <p>注册一账通</p>
             <div class="nomalInput">
               <input placeholder="输入手机号码"  v-model="registForm.phone" v-on:focus="showDel('phone')" v-on:blur="checkPhone()" type="text"/>
               <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
               <div class="userExist" v-if="userExist">
                 <i>用户已存在</i><router-link to="login">去登入</router-link>
               </div>
             </div>
             <div class="code">
               <input type="text" v-on:focus="showDel('code')" v-on:blur="checkCode()" v-model="registForm.code" placeholder="输入验证码"/>
               <i :class="rules.code.class"  v-on:click="delContent('code')">{{rules.code.message}}</i>
               <span v-on:click="getCode()" ref="send">获取验证码</span>
             </div>
             <div class="nomalInput password">
               <input placeholder="输入密码" v-model="registForm.password" v-on:blur="checkPass()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.password.class"  v-on:click="delContent('password')">{{rules.password.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <div class="nomalInput password">
               <input placeholder="确认密码" v-model="registForm.repassword" v-on:blur="checkRePass()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.repassword.class"  v-on:click="delContent('repassword')">{{rules.repassword.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <div class="nomalInput">
               <input placeholder="推荐人" type="text"/>
             </div>
            <p :class="error?'registFial':'visiable'">{{errorMessage}}</p>
             <div v-if="!ispass" class="rbutton">
               <a class="no_button">下一步</a>
             </div>
            <div v-if="ispass" class="rbutton">
              <a v-on:click="submit"  class="ok_button">下一步</a>
            </div>
          </form>
          <form class="step2" v-if="step === 2" >
             <p>
               恭喜,注册成功~ <br/>
               恭交易操作需要完成邮箱验证,请完成邮箱验证
             </p>
            <div class="code">
              <input type="text" v-on:focus="showDel('email')" v-on:blur="checkEmail()" v-model="email" placeholder="请输入邮箱"/>
              <i :class="rules.email.class"  v-on:click="delEmail('email')">{{rules.email.message}}</i>
              <span v-on:click="getEmailCode()" ref="sendEmail">获取验证码</span>
            </div>
            <div class="codeInput">
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="请"  type="text"/>
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="输" type="text"/>
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="入" type="text"/>
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="验" type="text"/>
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="证" type="text"/>
              <input v-on:keyup="codeKeyup()" v-on:focus="clearVal" placeholder="码"  type="text"/>
            </div>

            <div v-if="!emailpass" class="sbutton">
               <a class="no_button">发送邮箱</a>
            </div>
            <div v-if="emailpass" class="sbutton">
              <a class="ok_button" >发送邮箱</a>
            </div>
            <div class="login_button">
              <router-link class="border_button" to="login">返回首页</router-link>
            </div>
          </form>
      </div>
  </section>
</template>

<script>
import Tool from '../../utils/Tool'
import '../../../static/greetest/gt'
import * as api from '../../service/getData'

export default {
  name: 'Regist',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      step: 2,
      emailpass: false,
      email: '',
      isSendCode: false,
      captchaObj: null,
      tokenId: null,
      phone: null,
      error: false,
      errorMessage: '注册失败',
      userExist: false,
      registForm: {
        phone: '',
        code: '',
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
          result.mobile = that.registForm.phone
          that.phone = that.registForm.phone
          result.gee_token = data.gee_token
          api.sendSMS(result).then(function (res) {
            if (res.data.code === 10001) {
              that.userExist = true
              return
            }
            if (!res.tokenId) {
              that.$prompt.error('发送失败')
              return
            }
            that.tokenId = res.tokenId
            that.isSendCode = true
            let currNode = that.$refs.send
            let number = 60
            currNode.innerHTML = '发送(' + number + 's)'
            let cuntDown = setInterval(function () {
              if (number <= 0) {
                currNode.innerHTML = '获取验证码'
                clearInterval(cuntDown)
              } else {
                number = --number
                currNode.innerHTML = '已发送(' + number + 's)'
              }
            }, 1000)
          })
        })
      })
    },
    showDel (field) {
      this.rules[field].class = 'del'
      this.rules[field].message = ''
    },
    delContent (field) {
      this.registForm[field] = ''
    },
    delEmail () {
      this.email = ''
    },
    checkPhone (bool) {
      this.userExist = false
      if (this.registForm.phone === '') {
        if (!bool) {
          this.rules.phone.class = 'del'
          this.rules.phone.message = '请输入手机号码'
        }
        return false
      }
      if (!Tool.isPoneAvailable(this.registForm.phone)) {
        if (!bool) {
          this.rules.phone.class = 'del'
          this.rules.phone.message = '手机号码错误'
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
          this.rules.code.message = '请获取验证码'
        }
        return false
      }
      if (this.registForm.code === '') {
        if (!bool) {
          this.rules.code.class = 'del'
          this.rules.code.message = '请输入验证码'
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
      if (this.registForm.password === '') {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = '请输入密码'
        }
        return false
      } else if (this.registForm.password.length < 6) {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = '密码至少6位'
        }
        return false
      } else if (!reg.test(this.registForm.password)) {
        if (!bool) {
          this.rules.password.class = 'del'
          this.rules.password.message = '数字和字母组合'
        }
        return false
      } else {
        this.rules.password.class = 'pass'
        this.rules.password.message = ''
        return true
      }
    },
    checkRePass (bool) {
      if (this.registForm.repassword === '') {
        if (!bool) {
          this.rules.repassword.class = 'del'
          this.rules.repassword.message = '请输入确认密码'
        }
        return false
      } else if (this.registForm.password !== this.registForm.repassword) {
        if (!bool) {
          this.rules.repassword.class = 'del'
          this.rules.repassword.message = '两次密码不一致'
        }
        return false
      } else {
        this.rules.repassword.class = 'pass'
        this.rules.repassword.message = ''
        return true
      }
    },
    checkEmail (bool) {
      if (this.email === '') {
        if (!bool) {
          this.rules.email.class = 'del'
          this.rules.email.message = '请输入邮箱'
        }
        return false
      } else if (!Tool.isEmail(this.email)) {
        if (!bool) {
          this.rules.email.class = 'del'
          this.rules.email.message = '邮箱格式错误'
          return false
        }
      } else {
        this.emailpass = true
        this.rules.email.class = 'pass'
        this.rules.email.message = ''
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
    emailPassDown () {
      if (this.checkEmail(true)) {
        this.emailpass = true
      } else {
        this.emailpass = false
      }
    },
    submit () {
      let params = {
        mobile: this.phone,
        tokenId: this.tokenId,
        code: this.registForm.code,
        pass: Tool.md5(this.registForm.password),
        referee: this.registForm.recommed
      }
      let that = this
      this.ispass = false
      api.regist(params).then(function (res) {
        if (res.data.code === 10000 && res.ngtoken) {
          Tool.setCookie('ngtoken', res.ngtoken)
          that.$store.dispatch('setUserInfo', res.userinfo)
          that.$router.push('/')
          that.step = 2
        } else {
          if (res.data.code === 10002) {
            that.error = true
            that.errorMessage = '验证码错误'
          } else {
            that.error = true
            that.errorMessage = '注册失败'
          }

          that.ispass = true
        }
      })
    },
    getEmailCode () {
      let _this = this
      this.emailpass = false
      if (!this.checkEmail(true)) {
        return
      }
      api.getEmailCode({email: this.email}).then(function (res) {
        let currNode = _this.$refs.sendEmail
        let number = 60
        currNode.innerHTML = '发送(' + number + 's)'
        let cuntDown = setInterval(function () {
          if (number <= 0) {
            currNode.innerHTML = '获取验证码'
            clearInterval(cuntDown)
          } else {
            number = --number
            currNode.innerHTML = '已发送(' + number + 's)'
          }
        }, 1000)
      })
    },
    getCode () {
      if (this.checkPhone() && this.$refs.send.innerHTML === '获取验证码') {
        this.captchaObj.verify()
      }
    },
    codeKeyup (event) {
      let val = event.target.value
      let regPos = /^\d+(\.\d+)?$/
      if (regPos.test(val)) {
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
    loginEmail () {
      let email = this.email
      let pre = email.split('@')[1]
      let hash = {
        'qq.com': 'http://mail.qq.com',
        'gmail.com': 'http://mail.google.com',
        'sina.com': 'http://mail.sina.com.cn',
        '163.com': 'http://mail.163.com',
        '126.com': 'http://mail.126.com',
        'yeah.net': 'http://www.yeah.net/',
        'sohu.com': 'http://mail.sohu.com/',
        'tom.com': 'http://mail.tom.com/',
        'sogou.com': 'http://mail.sogou.com/',
        '139.com': 'http://mail.10086.cn/',
        'hotmail.com': 'http://www.hotmail.com',
        'live.com': 'http://login.live.com/',
        'live.cn': 'http://login.live.cn/',
        'live.com.cn': 'http://login.live.com.cn',
        '189.com': 'http://webmail16.189.cn/webmail/',
        'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
        'yahoo.cn': 'http://mail.cn.yahoo.com/',
        'eyou.com': 'http://www.eyou.com/',
        '21cn.com': 'http://mail.21cn.com/',
        '188.com': 'http://www.188.com/',
        'foxmail.com': 'http://www.foxmail.com',
        'outlook.com': 'http://www.outlook.com'
      }
      window.open(hash[pre])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../style/common';
  @import './index';
  @import './../../style/form.less';
  .step1{
      padding-top:110px;
      p{
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        margin:0 0 38px 0;
    }
    .registFial{
      margin-top:28px;
      margin-bottom:10px;
      font-size:14px;
      color: #39f1ff;
    }
    .rbutton{
      text-align: center;
      margin-bottom:30px;
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
  .step2, .step3{
    padding-top:100px;
    >p:nth-child(1){
      text-align: center;
      font-size: 20px;
      color:#fff;
      letter-spacing: 0px;
      margin:0 0 50px 0;
    }
    >p:nth-child(2) {
      margin-top:75px;
      text-align: center;
      font-size: 16px;
      color:#fff;
      letter-spacing: 0px;
    }
    .to_button{
      margin-top:15px;
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
  .visiable{
    visibility: hidden;
  }
  .userExist{
    position:absolute;
    right:30px;
    top:15px;
    >i{
      font-size:12px;
      margin-right:5px;
    }
    >a{
      color: #39f1ff;
    }
  }
</style>
