<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { ref, watch, watchEffect, computed } from 'vue'
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService.js'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
// import NProgress from 'nprogress'

const events = ref(null)
const totalEvents = ref(0)
const router = useRouter()

const props = defineProps({
  page: {
    // 從routing來的
    type: Number,
  },
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages
})

// 使用watch
// watch(
//   () => props.page,
//   (newPage) => {
//     events.value = null
//     EventService.getEvents(2, newPage)
//       .then((response) => {
//         console.log('Get response successfully.')
//         // console.log(response)
//         events.value = response.data
//         totalEvents.value = response.headers['x-total-count']
//       })
//       .catch((error) => {
//         console.log(error)

//         router.push({ name: 'NetworkError' })
//       })
//   },
//   { immediate: true },
// )

// 使用watchEffect
// watchEffect(() => {
//   events.value = null
//   EventService.getEvents(2, props.page)
//     .then((response) => {
//       console.log('Get response successfully.')
//       events.value = response.data
//     })
//     .catch((error) => console.log(error))
// })

// 使用guard
// beforeRouteEnter(routeTo, routeFrom, next) {
//     NProgress.start()
//     EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
//       .then(response => {
//         next(comp => {
//           comp.events = response.data
//           comp.totalEvents = response.headers['x-total-count']
//         })
//       })
//       .catch(() => {
//         next({ name: 'NetworkError' })
//       })
//       .finally(() => {
//         NProgress.done()
//       })
// }

EventService.getEvents(2, props.page)
  .then((response) => {
    // NProgress.start()
    console.log('Get response successfully.')

    events.value = response.data
    totalEvents.value = response.headers['x-total-count']
  })
  .catch((error) => {
    console.log(error)

    router.push({ name: 'NetworkError' })
  })
// .finally(() => {
//   NProgress.done()
// })

onBeforeRouteUpdate(async (routeTo) => {
  // NProgress.start()
  events.value = null

  await EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
    .then((response) => {
      console.log('Get response successfully.')

      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch(() => {
      return { name: 'NetworkError' }
    })
  // .finally(() => {
  //   NProgress.done()
  // })
})
</script>

<template>
  <div>
    <!-- <TheWelcome /> -->
    <h1>Events for Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination">
        <RouterLink
          id="page-prev"
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          >&#60; Prev</RouterLink
        >

        <RouterLink
          id="page-next"
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          >Next &#62;</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
  justify-content: space-around;
}

.pagination a {
  flex: 1;
}

.pagination a:hover {
  background-color: transparent;
}

#page-next {
  text-align: right;
}
</style>
