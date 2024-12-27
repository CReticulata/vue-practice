<script setup>
import { ref } from 'vue'
import EventService from '../services/EventService.js'

const event = ref(null)

const props = defineProps({
  id: {
    // 從routing來的
    type: String,
    required: true,
  },
})

EventService.getEvent(props.id)
  .then((response) => {
    console.log('Get response successfully.')
    event.value = response.data
  })
  .catch((error) => console.log(error))
</script>

<template>
  <div class="event-detail" v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: transform 0.2s;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-detail {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
}

@media (min-width: 1024px) {
  .event-detail {
    justify-content: center;
  }
}
</style>
