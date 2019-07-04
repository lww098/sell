import Vue from 'vue'
import Router from 'vue-router'
import sellers from '../components/sellers/sellers'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/sellers',
      component: sellers
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/goods',
      component: goods
    }
  ],
  linkActiveClass: 'active'
})
