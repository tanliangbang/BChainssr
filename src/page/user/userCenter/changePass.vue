<template>
  <section>
    <div class="changeEmail">
      <form   v-bind:style="{minHeight: this.$store.getters.getMinHeight}" v-on:keyup="onPageDown">
        <div class="common-nav">
          <router-link to="userCenter">账户安全</router-link> >
          <i>找回密码</i>
        </div>
        <div class="nomalInput">
          <input   v-model="form.phone" disabled="true" type="text"/>
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
        <p class="errorPrompt">{{errorMessage}}</p>
        <div v-if="!ispass" class="sbutton">
          <a class="no_button">{{$t('lang.form.next')}}</a>
        </div>
        <div v-if="ispass" class="sbutton">
          <a v-on:click="submit"  class="ok_button">{{$t('lang.form.next')}}</a>
        </div>

      </form>
    </div>
  </section>
</template>

<script>
import FormFun from '../../../utils/FormFun'
import * as api from '../../../service/getData'
import { mapGetters } from 'vuex'
import Tool from '../../../utils/Tool'
if (typeof window !== 'undefined') {
  require('static/greetest/gt')
}
export default {
  name: 'ChangePass',
  components: {
  },
  data () {
    return {
      isShowpass: false,
      ispass: false,
      isSendPhoneCode: false,
      captchaObj: null,
      tokenId: null,
      phone: null,
      error: false,
      errorMessage: '',
      form: {
        phone: '',
        code: '',
        password: '',
        repassword: ''
      },
      rules: {
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
  mounted () {
    window.scrollTo(0, 0)
    this.initDate()
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    async initDate () {
      let data = await api.getGreetest()
      let _this = this
      data = data.data
      this.form.phone = this.userInfo.mobile
      FormFun.initGreetest(_this, data, function (captchaObj) {
        _this.captchaObj = captchaObj
        captchaObj.onSuccess(function () {
          let result = captchaObj.getValidate()
          result.mobile = _this.form.phone
          _this.phone = _this.form.phone
          result.gee_token = data.gee_token
          let currNode = _this.$refs.send
          currNode.className = 'button-loading'
          currNode.innerHTML = ''
          api.resetSendSMS(result).then(function (res) {
            currNode.className = ''
            if (res.status === 200) {
              _this.tokenId = res.data.tokenId
              _this.isSendPhoneCode = true
              FormFun.sendCodeed(_this, currNode)
            } else {
              currNode.innerHTML = _this.$t('lang.form.getCode')
              _this.$prompt.error(_this.$t('lang.errorPrompt.' + res.message))
            }
          })
        })
      })
    },
    showDel (field) {
      this.rules[field].class = 'del'
      this.rules[field].message = ''
    },
    delContent (field) {
      this.form[field] = ''
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
      this.errorMessage = ''
      if (this.isSendPhoneCode && this.checkCode(true) && this.checkPass(true) && this.checkRePass(true)) {
        this.ispass = true
      } else {
        this.ispass = false
      }
    },
    submit () {
      let params = {
        mobile: this.form.phone,
        tokenId: this.tokenId,
        code: this.form.code,
        pass: Tool.md5(this.form.password)
      }
      let _this = this
      this.ispass = false
      api.foundByPone(params).then(function (res) {
        if (res.status === 200) {
          _this.$mask.showAlert(_this.$t('lang.form.changeSuccess'), 'success', function () {
            _this.$router.push('/userCenter')
          }, _this.$t('lang.form.submit'))
        } else {
          _this.ispass = true
          _this.$prompt.error(_this.$t('lang.form.changeFail'))
        }
      })
    },
    getCode () {
      if (this.$refs.send.innerHTML === this.$t('lang.form.getCode')) {
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
@import '../../../style/common';
@import './../../../style/form.less';
section{
  padding:20px;
}
.changeEmail{
   background-color: @bg_color;
   form{
     margin:0 300px;
   }
}
</style>
