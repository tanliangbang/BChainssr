<template>
  <div class="auther">
    <div class="auther-nav">
      <span v-on:click="changeStep(1)" :class="step===1?'selected':''">{{$t("lang.userCenter.level1")}}</span>
      <span v-on:click="changeStep(2)" :class="step===2?'selected':''">{{$t("lang.userCenter.level2")}}</span>
    </div>
    <div v-if="step===1" class="nomal-auther">
      <!--<div>
        <span>{{$t("lang.userCenter.nationality")}}</span>
        <span>中国</span>
      </div>-->
      <div class="inputNomal">
        <span>{{$t("lang.userCenter.name")}}</span>
        <div>
          <input type="text">
        </div>
      </div>
      <div class="inputNomal">
        <span>{{$t("lang.userCenter.idNumber")}}</span>
        <div>
          <input type="text">
        </div>
      </div>

      <div class="upload-div">
        <div>{{$t("lang.userCenter.uploadId2")}}</div>
        <div>
          <div  class="upload">
            <div v-on:click="selectImg($event)">
              <span>上传</span>
            </div>
            <input type="file" class="hide">
          </div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>{{$t("lang.userCenter.forExample")}}</p>
          <p>{{$t("lang.userCenter.prompt")}}</p>
        </div>
      </div>

      <div class="upload-div">
        <div>{{$t("lang.userCenter.uploadId2")}}</div>
        <div>
          <div class="upload">
            <span>上传</span>
          </div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>{{$t("lang.userCenter.forExample")}}</p>
          <p>{{$t("lang.userCenter.prompt")}}</p>
        </div>
      </div>

      <div class="upload-div">
        <div>{{$t("lang.userCenter.uploadId2")}}</div>
        <div>
          <div class="upload">
            <span>上传</span>
          </div>
        </div>
        <div>
          <img src="../../../../static/img/sfz.png">
          <p>{{$t("lang.userCenter.forExample")}}</p>
          <p>{{$t("lang.userCenter.prompt")}}</p>
        </div>
      </div>

      <a class="button">{{$t("lang.userCenter.next")}}</a>
    </div>

    <div v-if="step===2" class="second-auther">

    </div>
  </div>
</template>

<script>
import Tool from '../../../utils/Tool'
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
    },
    selectImg (event) {
      event.stopPropagation()
      let target = Tool.getTarget(event)
      Tool.stopProp(event)
      let input = null
      if (target.tagName === 'SPAN') {
        input = target.parentNode.nextElementSibling
      } else if (target.tagName === 'DIV') {
        input = target.nextElementSibling
      }
      input.click()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../style/common";
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
    .inputNomal{
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
      >div{
        flex:1;
        >input{
          background-color: #273c6e;
          border-radius: 8px;
          border: solid 2px #304a87;
          color: #fff;
          height:40px;
          font-size: 17px;
          padding-left:20px;
        }
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
      text-align: left;
      padding-left:30px;
    }
    .upload{
       cursor: pointer;
        width: 320px;
        height: 195px;
        background-color: #28427b;
        border-radius: 4px;
        margin-top:29px;
        position:relative;
        text-align: center;
        >div{
          width:100%;
          height:100%;
          >span{
            font-size:16px;
            color:#fff;
            position:relative;
            margin-top:97px;
            display:inline-block;
          }
          >span:after{
            content: ' ';
            width:23px;
            height:26px;
            position:absolute;
            left:3px;
            top:-30px;
            background:url('../../../../static/img/upload.png')
          }
        }
    }
    >div:nth-child(2){
      width:40%;
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
