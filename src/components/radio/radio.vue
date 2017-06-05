<template>
  <div class="ranking">
  		<ul class="ranking-pro">
  			<h1>{{everydaymusic[0].name}}</h1>
  			<img :src="everydaymusic[0].src">
  			 <router-link :to="{name:'songplay',params:{item1:item1}}" tag="li" v-for="(item1, index) in everydaymusic[0].musiclist">
  				<p class="active">{{index+1}}. {{item1.name}}</p>
  				<p>{{item1.user}}-{{item1.special}}</p>
  			</router-link>
  		</ul>
  		<ul class="ranking-pro">
  			<h1>{{everydaymusic[1].name}}</h1>
  			<img :src="everydaymusic[1].src">
  			<router-link :to="{name:'songplay',params:{item1:item1}}" tag="li" v-for="(item1, index) in everydaymusic[1].musiclist">
  				<p class="active">{{index+1}}. {{item1.name}}</p>
  				<p>{{item1.user}}-{{item1.special}}</p>
  			</router-link>
  		</ul>
  		<ul class="ranking-pro">
  			<h1>{{everydaymusic[2].name}}</h1>
  			<img :src="everydaymusic[2].src">
  			<router-link :to="{name:'songplay',params:{item1:item1}}" tag="li" v-for="(item1, index) in everydaymusic[2].musiclist">
  				<p class="active">{{index+1}}. {{item1.name}}</p>
  				<p>{{item1.user}}-{{item1.special}}</p>
  			</router-link>
  		</ul>
  		<ul class="ranking-pro">
  			<h1>{{everydaymusic[3].name}}</h1>
  			<img :src="everydaymusic[3].src">
  			<router-link :to="{name:'songplay',params:{item1:item1}}" tag="li" v-for="(item1, index) in everydaymusic[3].musiclist">
  				<p class="active">{{index+1}}. {{item1.name}}</p>
  				<p>{{item1.user}}-{{item1.special}}</p>
  			</router-link>
  		</ul>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        everydaymusic: Object,
        everymusiclist: [],
        item1: Object
      }
    },
    mounted () {
      this.$http.get('./static/radiodata.json').then((response) => {
        console.log(response)
        this.response = response.data
        this.everydaymusic = this.response.music
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.ranking
		width: 100%
		height: 100%
		.ranking-pro
			width: 100%
			height: 100%
			margin-top: 10px
			background: #CCDDFF
			&:first-child
				margin-top: 0px
			h1
				width: 100%
				height: 30px
				line-height: 30px
				font-weight: bold
				font-size: 16px
				padding-left: 4px
				color: #fff
				background: #708090
			img
				width: 100%
				height: 200px
			li
				width: 100%
				height: 50px
				background: #5599FF
				color: #fff
				border-bottom: 1px solid #CCCCFF
				p
					width: 100%
					height: 25px
					line-height: 25px
					padding-left: 2px
					font-size: 14px
					opacity: 0.8
					&.active
						color: red
						font-weight: bold
						font-size: 15px
</style>
