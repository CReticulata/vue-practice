<script setup>
import { ref } from 'vue'
import EventService from '../../services/EventService.js'
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'

const event = ref(null)

const props = defineProps({
  id: {
    // 從routing來的
    type: String,
    required: true,
  },
})

const router = useRouter()

EventService.getEvent(props.id)
  .then((response) => {
    console.log('Get response successfully.')
    console.log(response)
    event.value = response.data
  })
  .catch((error) => {
    // console.log(error)
    console.log(error.status)

    if (error.status === 404) {
      router.push({ path: '/not-found' })
      // router.push({ name: 'NotFound', params: { pathMatch: 'NotFound' } })
    }
  })

const route = useRoute()

function isActive() {
  return true
}
</script>

<template>
  <div class="event-detail" v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'EventDetails' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'EventRegister' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'EventEdit' }">Edit</RouterLink>
    </div>

    <RouterView :event="event" />
  </div>
</template>

<style scoped>
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

.nav {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 0 20px;
}

.nav a {
  color: var(--color-text);
}

.nav a:hover {
  color: hsla(160, 100%, 37%, 1);
  background-color: transparent;
}

.nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}
</style>
