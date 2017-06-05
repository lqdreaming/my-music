<template>
  <div class="song">
  	<div class="song-up">
  		<h1>最新歌单</h1>
  	</div>
  	<div class="song-middle">
      <li v-for="(item, index) in music" class="song-con">
        <h1>{{item.name}}</h1>
        <img :src="item.coverImgUrl">
      </li>
      <span class="song-inf">
        <ul v-for="item1 in musiclisttotal">
           <router-link :to="{name:'songplay',params:{item1:item2}}" tag="li" v-for="item2 in item1">
            <!--<h2>{{item2.al.name}}</h2>
            <p>-{{item2.name}}</p>-->
            <h2>{{item2.name}}</h2>
            <p>> {{item2.ar[0].name}} - {{item2.al.name}}</p>
          </router-link>
        </ul>
      </span>
  	</div>
  	<div class="song-down"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {
        music: [],
        item: Object,
        musiclisttrack: [],
        musiclisttotal: []
      }
    },
    created () {
      this.$http.get('http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=0').then((response) => {
        response = response.body
        this.music = response.playlists
        for (var i = 0; i < this.music.length; i++) {
          var id = this.music[i].id
          this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id).then((response) => {
            response = response.body
            this.musiclist = response.playlist
            this.musiclistcreator = this.musiclist.creator
            this.musiclisttrack = this.musiclist.tracks
            this.musiclisttrack = this.musiclisttrack
            this.musiclisttrack.length = 3
            this.musiclisttotal.push(this.musiclisttrack)
          })
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .song
    width: 100%
    height: 100%
    background: #DDDDDD
    .song-up
      width: 100%
      height: 40px
      line-height: 40px
      background: #5F9EA0
      h1
        display: inline-block
        font-size: 16px
        font-weight: bold
    .song-middle
      width: 100%
      height: 100%
      position: relative
      .song-con
        width: 100%
        height: 240px
        margin-bottom: 10px
        background: #FFEFD5
        h1
          width: 100%
          height: 30px
          padding-top: 5px
          font-size: 15px
          font-weight: bold
          color: red
          opacity: 0.6
        img
          display: inline-block
          width: 150px
          height: 180px
      .song-inf
        display: inline-block
        width: 200px
        height: 180px
        position: absolute
        left: 155px
        top: 10px
        color: black
        ul
          width: 100%
          height: 250px
          li
            width: 100%
            height: 32px
            padding-top: 30px
            h2
              font-size: 14px
              width: 100%
              height: 16px
              overflow: hidden
            p
              width: 100%
              height: 13px
              overflow: hidden
              font-size: 10px
              opacity: 0.6
              padding-top: 2px
</style>
