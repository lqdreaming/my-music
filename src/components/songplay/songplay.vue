<template>
  <div class="songPlay">
    <div class="songPlay-header">
      <router-link :to="{name:'song',params:{item:item}}" tag="i" v-if="item"><img src="./back.png"></router-link>
      <img src="./back.png" @click="back" v-if="!item">
      <div class="songPlay-name">
        <h1>{{item1.name}}</h1>
        <p v-if="!item1.user">{{item1.ar[0].name}} - {{item1.al.name}}</p>
        <p v-if="item1.user">{{item1.user}} - {{item1.special}}</p>
      </div>
    </div>
    <div class="songPlay-cover">
        <img :src="al.picUrl" :class="[isplaying?'rotate':'']" id="songplayImg" v-if="!item1.user">
        <img :src="item1.src1" :class="[isplaying?'rotate':'']" id="songplayImg" v-if="item1.user">
    </div>
    <div class="paly-audio">
      <audio :src="song.url" controls="controls" id="audio" @play="canPlaySong" @pause="noPlaySong"></audio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        song: Object,
        id: Number,
        item1: Object,
        item: Object,
        al: Object,
        meterNum: 50,
        isplaying: false,
        musiclisttrack: []
      }
    },
    mounted () {
      this.$nextTick(function () {
        var item1 = this.$route.params.item1
        var item = this.$route.params.item
        this.item1 = item1
        this.item = item
        this.al = item1.al
        var id = item1.id
        this.$http.get('http://musicapi.duapp.com/api.php?type=url&id=' + id).then((response) => {
          response = response.body
          this.song = response.data[0]
        })
      })
    },
    methods: {
      canPlaySong () {
        this.isplaying = true
      },
      noPlaySong () {
        this.isplaying = false
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .songPlay
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
      background: black
      color: #fff
      .songPlay-header
        width: 100%
        height: 60px
        img
          width: 30px
          height: 30px
          margin: 8px 0 5px 5px
        .songPlay-name
          display: inline-block
          width: 80%
          height: 30px
          line-height: 18px
          text-align: center
          h1
            font-size: 16px
            font-weight: bold
          p
            font-size: 14px
      .songPlay-cover
        width: 100%
        height: 540px
        text-align: center
        img
          width: 300px
          height: 300px
          border-radius: 300px
          margin-top: 100px
          &.rotate
            animation: rotate 10s infinite linear
            @-moz-keyframes rotate{
            0%{
              -moz-transform:rotate(0deg)
             }
             100%{
               -moz-transform:rotate(360deg)
             }
            }
            @-webkit-keyframes rotate{
              0%{
                -webkit-transform:rotate(0deg)
               }
               100%{
                 -webkit-transform:rotate(360deg)
               }
            }
            @keyframes rotate{
              0%{
                transform: rotate(0deg)
               }
               100%{
                 transform: rotate(360deg)
               }
            }
      .paly-audio
        width: 100%
        height: 35px
        background: #fff
        position: relative
        img
          display: inline-block
          width: 18px
          height: 18px
        .button-pre
          z-index: 999
          position: absolute
          left: -1px
          top: 7px
        .button-next
          position: absolute
          left: 32px
          top: 7px
        audio
          display: inline-block
          width: 100%
          height: 40px
          line-height: 40px
</style>
