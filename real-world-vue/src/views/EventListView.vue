<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import EventCard from '../components/EventCard.vue'

import { ref } from 'vue'
const events = ref(null)

import EventService from '../services/EventService.js'

EventService.getEvents()
  .then((response) => {
    console.log('Get response successfully.')
    events.value = response.data
  })
  .catch((error) => console.log(error))
</script>

<template>
  <div>
    <!-- <TheWelcome /> -->
    <h1>Events for Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped></style>
