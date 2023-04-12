import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history : createWebHashHistory(),
  routes : [
    {
      path : '/',
      redirect : '/home'
    },
    {
      path : '/home',
      component : () => import('@/View/home/home.vue')
    },
    {
      path : '/favor',
      component : () => import('@/View/favor/favor.vue')
    },
    {
      path : '/order',
      component : () => import('@/View/order/order.vue')
    },
    {
      path : '/message',
      component : () => import('@/View/message/message.vue')
    },
    {
      path : '/city',
      component : () => import('@/View/city/city.vue')
    },
    {
      path : '/search',
      component : () => import('@/View/search/search.vue'),
      meta: {
        hideTabBar: true
      }
    },
    {
      path : '/detail/:id',
      component : () => import('@/View/detail/detail.vue')
    }
  ]
})

export default router
