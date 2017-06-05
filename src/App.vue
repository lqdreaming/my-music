<template>
  <div>
     <v-header></v-header>
     <div class="tab border-1px">
        <div class="tab-item" @click="isShow">
          <router-link to="/song1">个性推荐</router-link> 
        </div>
        <div class="tab-item" @click="isShow">
          <router-link to="/songs">歌单</router-link>
        </div>
        <div class="tab-item" @click="isShow">
          <router-link to="/radio">排行榜</router-link>
        </div>
        <div class="tab-item" @click="isShow">
          <router-link to="/ranking">关于我</router-link>
        </div>
      </div>
    <router-view :music="music"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'

const ERR_OK = 0

export default {
  components: {
    'v-header': header
  },
  data () {
    return {
      optionActive: false,
      music: {}
    }
  },
  created () {
    this.$http.get('./static/data.json').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.music = response.data
      }
    })
  },
  methods: {
    isShow () {
      this.optionActive = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
  
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: black
      .router-link-active
          border-bottom: 2px solid red
</style>
