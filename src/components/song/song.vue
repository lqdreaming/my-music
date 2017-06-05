<template>
  <!-- 歌单信息-->
<div class="song">
  <div class="song-up">
    <router-link to="/song1" tag="i" class="song-arrow"></router-link>
    <h1>歌单</h1>
    <i class="song-back"></i>
  </div>
  <div class="song-middle">
    <div class="song-middle-sub">
      <img :src="musiclistcreator.backgroundUrl">
      <span class="song-middle-des">{{musiclist.description}}</span>
      <span class="song-middle-des-more"> >> </span>
    </div>
    <div class="song-middle-information">
      <ul>
        <li>
          <img src="./list-3.png">
          <p>{{item.commentCount}}</p>
        </li>
        <li>
          <img src="./list-2.png">
          <p>{{item.playCount}}</p>
        </li>
        <li>
          <img src="./list-1.png">
          <p>{{item.shareCount}}</p>
        </li>
        <li>
          <img src="./list-4.png">
          <p>下载</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="song-down">
    <div class="song-down-header">
      <img src="./start.png" class="song-play">
      <span class="song-play-title">播放全部</span>
      <span class="song-play-introuduce">(共<i>{{musiclisttrack.length}}</i>首)</span>
      <img src="./menu.png" class="song-total">
    </div>
    <div class="song-down-content">
      <!--<li @mouseover="highlight(index)" v-for="(item1, index) in musiclisttrack" :class="[item1.isactive?'active':'']">-->
      <!--{path: 'songplay/:item1.id', params: { id: item1.id }}-->
      <router-link :to="{name:'songplay',params:{item1:item1,item:item}}" tag="li" @mouseover="highlight(index)" v-for="(item1, index) in musiclisttrack" :class="[item1.isactive?'active':'']">
          <h1>{{index+1}}</h1>
          <div class="song-item-con">
            <h2>{{item1.name}}</h2>
            <p>{{item1.ar[0].name}} - {{item1.al.name}}</p>
          </div>
          <img src="./more_horiz.png">
        </router-link>
    </div>    
  </div>
</div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        item1: Object,
        musiclist: [],
        musiclistcreator: [],
        musiclisttrack: [],
        item: Object
      }
    },
    mounted () {
      // this.getItems()
      this.$nextTick(function () {
        var item = this.$route.params.item
        this.item = item
        var id = item.id
        this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id).then((response) => {
          response = response.body
          this.musiclist = response.playlist
          this.musiclistcreator = this.musiclist.creator
          this.musiclisttrack = this.musiclist.tracks
        })
      })
    },
    methods: {
      highlight (index) {
        this.musiclisttrack[index].isactive = true
        var item1 = this.musiclisttrack[index]
        return item1.isactive
      }
      /* getItems () {
        var list = []
        this.data.forEach(i => {
          list.push({
            name: i,
            isactive: false
          })
        })
        this.musiclisttrack = list
      } */
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .song
      width: 100%
      height: 100%
      bg-image('1')
      position: absolute
      top: 0
      left: 0
      .song-up
        width: 100%
        height: 40px
        line-height: 40px
        text-align: center
        font-family: "微软雅黑"
        color: #fff
        .song-arrow
          display: inline-block
          width: 25px
          height: 25px
          position: absolute
          top: 7px
          left: 5px
          bg-image('back')
          background-size: 22px 22px
          background-repeat: no-repeat
        h1
          display: inline-block
          font-size: 15px
        .song-back
          display: inline-block
          width: 30px
          height: 30px
          position: absolute
          left: 90%
          top: 7px
          bg-image('ph')
          background-size: 22px 22px
          background-repeat: no-repeat
      .song-middle
        height: 270px
        color: #fff
        .song-middle-sub
          width: 100%
          position: relative
          height: 200px
          margin: 5px 25px
          img
            display: inline-block
            width: 150px
            height: 180px
          .song-middle-des
            display: inline-block
            position: absolute
            left: 160px
            top: 20px
            width: 150px
            height: 140px
            overflow: hidden
            font-size: 15px
            font-family: "微软雅黑"
            line-height: 20px
          .song-middle-des-more
            height: 20px
            line-height: 20px
        .song-middle-information
          width: 100%
          hieght: 80px
          ul
            display: flex
            text-align: center
            li
              flex: 1
              display: inline-block
              opacity: 0.9
              img
                width: 35px
                height: 35px
                padding-bottom: 5px
              p
                font-size: 12px
                opacity: 0.8
      .song-down
        display: table
        width: 100%
        height: 100%
        margin-top: 5px
        padding: 5px 5px 0 5px
        color: #fff
        background: #999966
        .song-down-header
          width: 100%
          height: 36px
          line-height: 36px
          position: relative
          .song-play
            width: 26px
            height: 26px
            position: absolute
            left: 2px
            top: 5px
          .song-play-title
            display: inline-block
            font-size: 15px
            padding-left: 40px
          .song-play-introuduce
            font-size: 12px
            opacity: 0.7
          .song-total
            width: 22px
            height: 22px
            position: absolute
            left: 88%
            top: 6px
        .song-down-content
          width: 100%
          height: 100%
          padding: 4px 8px 0 8px
          li
            width: 100%
            height: 40px
            margin: 10px 0
            border-bottom: 1px solid #fff
            position: relative
            &.active
              color: red
            h1
              display: inline-block
              vertical-align: top
              height: 40px
              line-height: 40px
              font-size: 14px
              opacity: 0.6
            .song-item-con
              display: inline-block
              padding-left: 15px
              h2
                width: 260px
                height: 20px
                overflow: hidden
                line-height: 20px
                font-size: 16px
              p
                width: 260px
                height: 20px
                overflow: hidden
                line-height: 20px
                font-size: 12px
                opacity: 0.6
            img
              width: 25px
              height: 20px
              border: 1px solid #B8B8B8
              border-radius: 4px
              position: absolute
              left: 85%
              top: 5px
</style>
