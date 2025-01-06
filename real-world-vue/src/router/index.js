import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/Event/Layout.vue'
import EventDetails from '../views/Event/Details.vue'
import EventRegister from '../views/Event/Register.vue'
import EventEdit from '../views/Event/Edit.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

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
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFoundComponent,
    },
  ],
})

export default router
