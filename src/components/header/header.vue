<template>
	<div class="header">
		<div class="searchpart">
			<div class="voice">
				<i class="voice-img"></i>
			</div>
			<div class="search" @click="showlist">
				<input type="text" class="search-box" id="search-box" value="" placeholder="搜索音乐、歌曲、电台">
			</div>
			<div class="music">
				<i class="music-img"></i>
			</div>
		</div>
		<div class="music-show" v-show="lshow">
			<ul class="list-ul">
				<li v-for="(item, index) in list" class="list-li">{{item}}</li>	
			</ul>
        	<span v-show="lshow" @click="hidelist" class="list-delete">取消</span>
      	</div>
	</div>
</template>

<script type="text/ecmascript-6">
  // import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        list: [],
        lshow: false
      }
    },
    methods: {
      showlist () {
        this.lshow = true
      },
      hidelist () {
        document.getElementById('search-box').value = ''
        this.lshow = false
      },
      openmusicsong () {
        var obj = null
        this.$emit('openmusicsong', obj)
      }
      /* search: function () {
        var name = document.getElementById('search-box').value
        this.$http.get('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg' + name).then((res) => {
          var data = res.data.data
          var obj = JSON.parse(data).result.songs
          this.list.splice(0, this.list.length)
          for (var i in obj) {
            this.$http.get('/detail/' + obj[i].id).then((res) => {
              var listdetail = JSON.parse(res.data.data).songs[0]
              this.list.push(listdetail)
            }).catch((error) => {
              console.log('加载歌曲信息出错:' + error)
            })
          }
        })
         if (name === '') {
          this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
            params: {
              g_tk: 5381,
              loginUin: 0,
              hostUin: 0,
              format: 'jsonp',
              inCharset: 'utf8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'yqq',
              needNewCode: 0
            },
            jsonp: 'jsonpCallback'
          }).then((res) => {
            var data = res.data.data
            var obj = data.hotkey
            for (var i in obj) {
              var listdetail = obj[i].k
              this.list.push(listdetail)
            }
          })
        } else {
          this.list.length = 0
          this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
            params: {
              special_key: name,
              loginUin: 0,
              hostUin: 0,
              format: 'jsonp',
              inCharset: 'utf8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'name',
              needNewCode: 0
            },
            jsonp: 'jsonpCallback'
          }).then((res) => {
            console.log(res)
            var data = res.data.data
            var obj = data.hotkey
            for (var i in obj) {
              var listdetail = obj[i].k
              this.list.push(listdetail)
              console.log(this.list)
            }
          })
        }
      } */
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.header
		width: 100%
		height: 45px
		background: red
		.searchpart
			display: flex
			width: 100%
			height: 45px
			.voice
				flex: 1
				height: 45px
				.voice-img
					display: inline-block
					width: 25px
					height: 25px
					margin: 10px
					bg-image('music')
					background-size: 25px 25px
					background-repeat: no-repeat
			.search
				flex: 5
				display: inline-block
				height: 45px
				line-height: 45px
				.search-box
					display: inline-block
					width: 100%
					height: 30px
					border-radius: 5px
					font-size: 14px
					color: #A8A8A8
			.music
				flex: 1
				display: inline-block
				height: 45px
				.music-img
					display: inline-block
					width: 25px
					height: 25px
					margin: 10px 0 10px 15px
					bg-image('ph')
					background-size: 25px 25px
					background-repeat: no-repeat
		.music-show
			position: fixed
			z-index: 100
			top: 45px
			left: 0
			width: 100%
			height: 100%
			opacity: 0.8
			background: #666699
			.list-ul
				height: 87.5%
				overflow-y: scroll
				.list-li
					display: block
					width: 100%
					height: 35px
					line-height: 35px
					padding-left: 5px
					font-size: 14px
					color: #fff
					border: 1px solid #fff
					border-left: none
			.list-delete
				position: absolute
				left: 0
				top: 86.9%
				width: 100%
				height: 40px
				line-height: 40px
				text-align: center
				font-size: 18px
				font-weight: bold
				color: red
				background: #FFFFCC
</style>
