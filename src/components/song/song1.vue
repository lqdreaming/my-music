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
			<router-link :to="{name:'song',params:{item:item}}" tag="li" @mouseover="highlight(index)" v-for="(item, index) in music" class="rec-content-part">
				<img :src="item.coverImgUrl">
				<div class="rec-content-title">{{item.name}}</div>
			</router-link>
		</div>
	</div>
  <!-- 歌单信息-->
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
</style>
