import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/Event/Layout.vue'
import EventDetails from '../views/Event/Details.vue'
import EventRegister from '../views/Event/Register.vue'
import EventEdit from '../views/Event/Edit.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '../services/EventService.js'
import GStore from '@/stores/GStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      // props: (route) => {
      //   return {
      //     page: parseInt(route.query.page) || 1,
      //   }
      // },
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
      meta: { transitionName: 'leftToRight' },
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      component: EventLayout,
      beforeEnter: async (to) => {
        await EventService.getEvent(to.params.id)
          .then((response) => {
            console.log('Get response successfully.')

            GStore.event = response.data
          })
          .catch((error) => {
            console.log(error)

            if (error.status === 404) {
              return { name: '404Resource', params: { resource: to.params.id } }
            } else {
              return { name: 'NetworkError' }
            }
          })
      },
      props: true,
      meta: { transitionName: 'rightToLeft' },
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
        },
      ],
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return {
          path: `/events/${to.params.afterEvent}`,
        }
      },
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
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundComponent,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFoundComponent,
      props: true,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
      props: true,
    },
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
  console.log('nprogress done')
})

export default router
