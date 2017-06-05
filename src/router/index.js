import Vue from 'vue'
import Router from 'vue-router'
import Axios from '../utils/axios'
/* import recommendation from '../components/recommendation/recommendation'
import songs from '../components/songs/songs'
import radio from '../components/radio/radio'
import ranking from '../components/ranking/ranking' */

import '../common/stylus/index.styl'

Vue.use(Router)

/* http */
Vue.prototype.$http = Axios

export default new Router({
  routes: [
    {
      path: '/song1',
      component: resolve => require(['@/components/song1/song1'], resolve)
    },
    {
      path: '/songs',
      component: resolve => require(['@/components/songs/songs'], resolve)
    },
    {
      path: '/radio',
      component: resolve => require(['@/components/radio/radio'], resolve)
    },
    {
      path: '/ranking',
      component: resolve => require(['@/components/ranking/ranking'], resolve)
    },
    {
      name: 'songplay',
      path: '/songplay/:item1',
      component: resolve => require(['@/components/songplay/songplay'], resolve)
    },
    {
      name: 'song',
      path: '/song/:item',
      component: resolve => require(['@/components/song/song'], resolve)
    }
  ]
})
