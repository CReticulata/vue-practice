<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { ref, watch, watchEffect, computed } from 'vue'
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService.js'

const events = ref(null)
const totalEvents = ref(0)

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
watch(
  () => props.page,
  (newPage) => {
    events.value = null
    EventService.getEvents(2, newPage)
      .then((response) => {
        console.log('Get response successfully.')
        // console.log(response)
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => console.log(error))
  },
  { immediate: true },
)

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
