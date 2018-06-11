<template>
  <section>
    <div class="changeEmail">
      <form   v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
        <div class="common-nav">
          <router-link to="userCenter">账户安全</router-link> >
          <i>修改邮箱</i>
        </div>
        <div>
          <div class="code">
            <p>18721675880</p>
            <span >{{$t('lang.form.getCode')}}</span>
          </div>
          <div class="nomalInput password">
            <input />
            <i ></i>
            <i></i>
          </div>

          <div class="code">
            <input type="text" v-on:focus="showDel('email')" v-on:blur="checkEmail()" v-model="form.email" :placeholder="$t('lang.form.emailPrompt')"/>
            <i :class="rules.email.class"  v-on:click="delEmail('email')">{{rules.email.message}}</i>
            <span v-on:click="getEmailCode()" ref="sendEmail">{{$t('lang.form.getCode')}}</span>
          </div>

          <div class="codeInput">
            <input v-on:keyup="codeKeyup($event, 0)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt1')"  type="text"/>
            <input v-on:keyup="codeKeyup($event, 1)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt2')" type="text"/>
            <input v-on:keyup="codeKeyup($event, 2)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt3')" type="text"/>
            <input v-on:keyup="codeKeyup($event, 3)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt4')" type="text"/>
            <input v-on:keyup="codeKeyup($event, 4)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt5')" type="text"/>
            <input v-on:keyup="codeKeyup($event, 5)" v-on:focus="clearVal" :placeholder="$t('lang.form.eCodePrompt6')"  type="text"/>
          </div>

          <div v-if="!verifyPass" class="sbutton">
            <a class="no_button">{{$t('lang.form.submit')}}</a>
          </div>
          <div v-if="verifyPass" class="sbutton">
            <a class="ok_button" v-on:click="bindEmail">{{$t('lang.form.submit')}}</a>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChangeEmail',
  components: {
  },
  data () {
    return {
      verifyPass: false,
      form: {
        email: ''
      },
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../../style/common";
@import "../../../style/form";

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
