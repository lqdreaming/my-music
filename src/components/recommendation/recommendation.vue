<template>
  <div class="rec">
	<swiper :options="swiperOption"  ref="mySwiper" class="rec-one" v-show="!lshow">  
	<!-- 这部分放你要渲染的那些内容 -->  
		<swiper-slide v-for="item in music">
			<img :src="item.subscribers[0].backgroundUrl" class="swiper-img">
		</swiper-slide>  
		<!-- 这是轮播的小圆点 -->  
		<div class="swiper-pagination" slot="pagination"></div>  
	</swiper> 
	<div class="rec-two">
			<router-link to="/songs" tag="li" class="rec-two-list">
				<img src="static/musicrecTwo/FM.png">
				<h1>最新歌单</h1>
			</router-link>
			<router-link to="/radio" tag="li" class="rec-two-list">
				<img src="static/musicrecTwo/aei.png">
				<h1>每日歌曲推荐</h1>
			</router-link>
			<router-link to="/ranking" tag="li" class="rec-two-list">
				<img src="static/musicrecTwo/ph.png">
				<h1>云音乐热歌榜</h1>
			</router-link>
	</div>
	<div class="rec-three">
		<div class="rec-title">
			<div class="title-left">
				<img class="title-left-img" src="static/musicrecThree/aee.png">
				<h1 class="title-songs">推荐歌单</h1>
			</div>
			<div class="title-right">
				 <router-link to="/songs" tag="h1">更多</router-link>
				<img src="static/musicrecThree/arrows_right.png">
			</div>
		</div>
		<div class="rec-content">
			<li v-for="(item, index) in music" class="rec-content-part" @click="show(item,item.id)">
				<img :src="item.coverImgUrl">
				<div class="rec-content-title">{{item.name}}</div>
			</li>
		</div>
	</div>
  <!-- 歌单信息-->
  <div class="song" v-show="lshow">
  <div class="song-up">
    <i class="song-arrow" @click="hideshow"></i>
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
      <router-link :to="{name:'songplay',params:{item1:item1}}" tag="li" @mouseover="highlight(index)" v-for="(item1, index) in musiclisttrack" :class="[item1.isactive?'active':'']">
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
    <!--歌曲播放页面 @canplay="canPlaySong" @timeupdate="updateTime"-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        music: [],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 30,
          onSlideChangeEnd: swiper => {
          // 这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1
            this.index = swiper.realIndex
          }
        },
        swiperSlides: [1, 2, 3, 4, 5],
        lshow: false,
        item: Object,
        item1: Object,
        musiclist: [],
        index: Number,
        musiclistcreator: [],
        musiclisttrack: []
      }
    },
    mounted () {
      // 这边就可以使用swiper这个对象去使用swiper官网中的那些方法
      // this.swiper.slideTo(0, 0, false)
      this.getItems()
    },
    methods: {
      show (item, id) {
        this.lshow = true
        this.item = item
        // 按id请求每个歌单数据
        this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=' + id).then((response) => {
          response = response.body
          this.musiclist = response.playlist
          this.musiclistcreator = this.musiclist.creator
          this.musiclisttrack = this.musiclist.tracks
        })
      },
      hideshow () {
        this.lshow = false
      },
      getItems () {
        var list = []
        this.data.forEach(i => {
          list.push({
            name: i,
            isactive: false
          })
        })
        this.musiclisttrack = list
      },
      highlight (index) {
        this.musiclisttrack[index].isactive = true
        var item1 = this.musiclisttrack[index]
        return item1.isactive
      }
    },
    created () {
      this.$http.get('http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=0&limit=6').then((response) => {
        response = response.body
        this.music = response.playlists
      })
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .rec
    width: 100%
    height: 100%
    .rec-one
      width: 100%
      margin-top: 2px
      .swiper-img
        width: 100%
        height: 180px
    .rec-two
      width: 100%
      margin: 20px 0
      display: flex
      .rec-two-list
        flex: 1
        text-align: center
        img
          width: 60px
          height: 60px
          border: 1px solid red
          border-radius: 60px
        h1
          margin-top: 5px
          font-size: 12px
          font-family: "微软雅黑"
          opacity: 0.6
    .rec-three
      width: 100%
      height: 100%
      margin: 0 5px
      .rec-title
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        position: relative
        .title-left
          flex: 5
          .title-left-img
            position: absolute
            top: 8px
            left: 0
          .title-songs
              display: inline-block
              font-size: 14px
              font-family: "微软雅黑"
              margin: 0 30px
        .title-right
          flex: 1.1
          opacity: 0.7
          h1
            display: inline-block
            font-size: 14px
          img
            width: 26px
            height: 14px
            position: absolute
            left: 90%
            top: 13px
      .rec-content
        width: 96%
        .rec-content-part
          display: inline-block
          width: 33% 
          height: 155px       
          img
            width: 110px
            height: 110px 
          .rec-content-title
            width: 110px
            height: 35px
            line-height: 16px
            overflow: hidden
            margin: 2px 2px
            font-size: 12px
            font-family: "微软雅黑"
            opacity: 0.8
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
