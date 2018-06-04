<template>
  <section class="foundPassword">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
        <div class="nav_found">
          <a v-on:click="toChange('phone')" :class="foundWay === 'phone'?'select':''">手机找回密码</a>
          <a v-on:click="toChange('email')" :class="foundWay === 'email'?'select':''">邮箱找回密码</a></div>

        <form class="phone_found" v-if="foundWay === 'phone'" v-on:keyup="onPageDown">
             <div class="nomalInput">
               <input placeholder="输入手机号码"  v-model="registForm.phone" v-on:focus="showDel('phone')" v-on:blur="checkPhone()" type="text"/>
               <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
             </div>
             <div class="code">
               <input type="text" v-on:focus="showDel('code')" v-on:blur="checkCode()" v-model="registForm.code" placeholder="输入验证码"/>
               <i :class="rules.code.class"  v-on:click="delContent('code')">{{rules.code.message}}</i>
               <span>获取验证码</span>
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

             <div v-if="!ispass" class="rbutton">
               <a class="no_button" v-on:click="changePass()">确认</a>
             </div>
            <div v-if="ispass" class="rbutton">
              <a v-on:click="submit"  class="ok_button">确认</a>
            </div>
          </form>
          <form class="email_form" v-if="foundWay === 'email'" v-on:keyup="checkEmail()">
            <div class="code">
              <input type="text" v-on:focus="showDel('email')"  v-model="email" placeholder="输入验证码"/>
              <i :class="rules.email.class"  v-on:click="delContent('email')">{{rules.email.message}}</i>
              <span>发送邮箱</span>
            </div>
            <p>已经给6481025545@qq.com发送邮件，按照邮箱提示进行密码找回</p>
            <div v-if="!emailpass" class="toEmail">
              <a class="no_button">登入邮箱</a>
            </div>
            <div v-if="emailpass" class="toEmail">
              <a class="ok_button">登入邮箱</a>
            </div>
          </form>
      </div>
  </section>
</template>

<script>
import Tool from '../../utils/Tool'
export default {
  name: 'FoundPassword',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      foundWay: 'phone',
      emailpass: false,
      email: '',
      registForm: {
        phone: '',
        code: '',
        password: '',
        repassword: ''
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
    window.scrollTo(0, 0)
  },
  methods: {
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
      if (this.checkPhone(true) && this.checkCode(true) && this.checkPass(true) && this.checkRePass(true)) {
        this.ispass = true
      } else {
        this.ispass = false
      }
    },
    emailPassDown () {
      if (this.checkEmail()) {
        this.emailpass = true
      } else {
        this.emailpass = false
      }
    },
    toChange (str) {
      this.foundWay = str
    },
    changePass () {
      this.$mask.showMask()
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
</style>
