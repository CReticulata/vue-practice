import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetails from '../views/EventDetails.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      meta: { transitionName: 'leftToRight' },
    },
    {
      path: '/event/:id',
      name: 'EventDetails',
      props: true,
      component: EventDetails,
      meta: { transitionName: 'rightToLeft' },
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 這行是如果想要用lazy load才要使用
      // component: () => import('../views/AboutView.vue'),
      component: AboutView,
      meta: { transitionName: 'rightToLeft' },
    },
  ],
})

export default router
