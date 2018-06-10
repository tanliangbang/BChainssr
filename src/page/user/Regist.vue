<template>
  <section class="regist">
      <div v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
          <form class="step1" v-if="step === 1" v-on:keyup="onPageDown">
             <p>{{$t("lang.form.registTitle")}}</p>
             <div class="nomalInput">
               <input :placeholder="$t('lang.form.phonePrompt')"  v-model="form.phone" v-on:focus="showDel('phone')" v-on:blur="checkPhone()" type="text"/>
               <i :class="rules.phone.class" v-on:click="delContent('phone')" >{{rules.phone.message}}</i>
               <div class="userExist" v-if="userExist">
                 <i>{{$t('lang.form.userExsit')}}</i><router-link to="login">{{$t('lang.form.goLogin')}}</router-link>
               </div>
             </div>
             <div class="code">
               <input type="text" v-on:focus="showDel('code')" v-on:blur="checkCode()" v-model="form.code" :placeholder="$t('lang.form.pleaseEnterCode')"/>
               <i :class="rules.code.class"  v-on:click="delContent('code')">{{rules.code.message}}</i>
               <span v-on:click="getCode()" ref="send">{{$t('lang.form.getCode')}}</span>
             </div>
             <div class="nomalInput password">
               <input :placeholder="$t('lang.form.passPrompt')" v-model="form.password" v-on:blur="checkPass()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.password.class"  v-on:click="delContent('password')">{{rules.password.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <div class="nomalInput password">
               <input :placeholder="$t('lang.form.repassPrompt')" v-model="form.repassword" v-on:blur="checkRePass()" :type="isShowpass?'text':'password'"/>
               <i :class="rules.repassword.class"  v-on:click="delContent('repassword')">{{rules.repassword.message}}</i>
               <i v-on:click="showpass()" :class="isShowpass?'showpass':'hidepass'"></i>
             </div>
             <div class="nomalInput">
               <input :placeholder="$t('lang.form.referrer')" type="text"/>
             </div>
            <p :class="error?'registFial':'visiable'">{{errorMessage}}</p>
             <div v-if="!ispass" class="rbutton">
               <a class="no_button">{{$t('lang.form.next')}}</a>
             </div>
            <div v-if="ispass" class="rbutton">
              <a v-on:click="submit"  class="ok_button">{{$t('lang.form.next')}}</a>
            </div>
          </form>
          <div class="step2" v-if="step === 2" >
              <BindEmail/>
          </div>
      </div>
  </section>
</template>

<script>
import Tool from '../../utils/Tool'
import FormFun from '../../utils/FormFun'
import * as api from '../../service/getData'
import BindEmail from './userCenter/BindEmail'
if (typeof window !== 'undefined') {
  require('../../../static/greetest/gt')
}
export default {
  name: 'Regist',
  components: {
    BindEmail
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      step: 2,
      isSendPhoneCode: false,
      captchaObj: null,
      tokenId: null,
      phone: null,
      error: false,
      errorMessage: this.$t('lang.form.registFail'),
      userExist: false,
      form: {
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
      let _this = this
      data = data.data
      FormFun.initGreetest(_this, data, function (captchaObj) {
        _this.captchaObj = captchaObj
        captchaObj.onSuccess(function () {
          let result = captchaObj.getValidate()
          result.mobile = _this.form.phone
          _this.phone = _this.form.phone
          result.gee_token = data.gee_token
          api.sendSMS(result).then(function (res) {
            if (res.status === 200) {
              _this.tokenId = res.data.tokenId
              _this.isSendPhoneCode = true
              let currNode = _this.$refs.send
              FormFun.sendCodeed(_this, currNode)
            } else if (res.status === 409) {
              _this.userExist = true
            } else {
              _this.$prompt.error(_this.$t('lang.form.sendFail'))
            }
          })
        })
      })
    },
    showDel (field) {
      FormFun.showDel(this, field)
    },
    delContent (field) {
      this.form[field] = ''
    },
    checkPhone (bool) {
      this.userExist = false
      return FormFun.checkPhone(this, bool)
    },
    checkCode (bool) {
      return FormFun.checkPhoneCode(this, bool)
    },
    checkPass (bool) {
      return FormFun.checkPass(this, bool)
    },
    checkRePass (bool) {
      return FormFun.checkRePass(this, bool)
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
        code: this.form.code,
        pass: Tool.md5(this.form.password),
        referee: this.form.recommed
      }
      let _this = this
      this.ispass = false
      api.regist(params).then(function (res) {
        if (res.status === 200) {
          Tool.setCookie('ngtoken', res.data.ngtoken)
          _this.$store.dispatch('setUserInfo', res.userinfo)
          _this.$router.push('/')
          _this.step = 2
        } else {
          _this.error = true
          _this.errorMessage = _this.$t('lang.errorPrompt.' + res.message)
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
    padding-top:50px;
    p:nth-child(1){
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
.visiable{
  visibility: hidden;
}
.userExist{
  position:absolute;
  right:30px;
  top: 17px;
  >i{
    font-size:12px;
    margin-right:5px;
  }
  >a{
    color: #39f1ff;
  }
}
</style>
