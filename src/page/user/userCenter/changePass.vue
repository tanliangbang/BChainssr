<template>
  <section>
    <div class="changeEmail">
      <form   v-bind:style="{minHeight: this.$store.getters.getMinHeight}">
        <div class="common-nav">
          <router-link to="userCenter">账户安全</router-link> >
          <i>找回密码</i>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChangePass',
  components: {
  },
  data () {
    return {
      isSendEmailCode: false,
      verifyPass: false,
      codeValue: [],
      form: {
        email: ''
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
