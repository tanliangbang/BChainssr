<template>
  <div class="auther">
    <div class="auther-nav">
      <span v-on:click="changeStep(1)" :class="step===1?'selected':''">一级认证</span>
      <span v-on:click="changeStep(2)" :class="step===2?'selected':''">二级认证</span>
    </div>
    <div v-if="step===1" class="nomal-auther">
      <div>
        <span>国籍</span>
        <span>中国</span>
      </div>
      <div>
        <span>姓名</span>
        <span>刘德</span>
      </div>
      <div>
        <span>省份中号码</span>
        <span>456556589969852235</span>
      </div>

      <a class="button">下 一 步</a>
    </div>

    <div v-if="step===2" class="second-auther">
      <div class="upload-div">
        <div>上传身份证正面</div>
        <div>
          <div></div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>示例</p>
          <p>支持jpg,png格式,单位文件不超过3M</p>
        </div>
      </div>

      <div class="upload-div">
        <div>上传身份证正面</div>
        <div>
          <div></div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>示例</p>
          <p>支持jpg,png格式,单位文件不超过3M</p>
        </div>
      </div>

      <div class="upload-div">
        <div>上传身份证正面</div>
        <div>
          <div></div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>示例</p>
          <p>支持jpg,png格式,单位文件不超过3M</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auther',
  components: {
  },
  data () {
    return {
      step: 1
    }
  },
  created () {
  },
  methods: {
    changeStep (num) {
      this.step = num
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .auther-nav{
    width: 100%;
    background-color: #273c6e;
    color:#fff;
    height:56px;
    border-bottom:1px solid #4177fc;
    margin-bottom:20px;
    >span{
      display:inline-block;
      padding:0px 40px;
      margin-right:30px;
      position:relative;
      line-height: 56px;
      cursor: pointer;
    }
    .selected::after{
      content:' ';
      position:absolute;
      height: 5px;
      width:100%;
      left:0px;
      bottom:-2px;
      z-index:2;
      background-image: linear-gradient(176deg, #245bfc 0%, #00a7ff 100%);
    }
  }
  .nomal-auther{
    >div{
      width: 100%;
      height: 56px;
      border-bottom:1px solid #314b79;
      display: flex;
      flex-wrap: wrap-reverse;
      margin-top:14px;
      >span{
        flex:1;
        padding-left:30px;
        line-height:56px;
        color: #a9c2fd;
      }
    }
    .next{
      text-align: center;
      margin-top:172px;
      margin-bottom:30px;
    }
    .button{
      width: 345px;
      height: 56px;
      margin:172px auto 56px;
      display:block;
      text-align: center;
      cursor: pointer;
      background-color: #4177fc;
      border-radius: 8px;
      color:#fff;
      font-size: 17px;
      line-height:56px;
    }
  }
  .upload-div{
    color:#fff;
    border-bottom:1px solid #314b79;
    >div{
      height:262px;
      float:left;
      text-align: center;
    }
    >div:nth-child(1) {
      width:30%;
      line-height:262px;
      color: #a9c2fd;
    }
    >div:nth-child(2){
      width:40%;
      >div{
        width: 320px;
        height: 195px;
        background-color: #284585;
        border-radius: 4px;
        opacity: 0.6;
        margin-top:29px;
      }
    }
    >div:nth-child(3){
      width:30%;
      >img{
        margin-top:49px;
      }
      >p:nth-child(2) {
        font-size: 14px;
        text-align: center;
      }
      >p:nth-child(3) {
        font-size: 12px;
        margin-top:5px;
        text-align: center;
      }
    }
  }
  .upload-div::after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .upload-div:last-child{
    border-bottom:none;
  }
</style>
