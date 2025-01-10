<script setup>
import { ref } from 'vue'
// import EventService from '../../services/EventService.js'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { inject } from 'vue'

// const event = ref(null)
const GStore = inject('GStore')

const props = defineProps({
  id: {
    // 從routing來的
    type: String,
    required: true,
  },
})

// const router = useRouter()

// EventService.getEvent(props.id)
//   .then((response) => {
//     console.log('Get response successfully.')
//     console.log(response)
//     event.value = response.data
//   })
//   .catch((error) => {
//     // console.log(error)
//     console.log(error)

//     if (error.status === 404) {
//       router.push({ name: '404Resource', params: { resource: props.id } })
//       // router.push({ name: 'NotFound', params: { pathMatch: 'NotFound' } })
//     } else {
//       router.push({ name: 'NetworkError' })
//     }
//     // 本來以為要找到network error的代碼，但影片直接用else處理了
//     // else if (error.code === "ERR_NETWORK") {
//     //   router.push({ name: 'NetworkError'})
//     // }
//   })
</script>

<template>
  <div class="event-detail" v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'EventDetails' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'EventRegister' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'EventEdit' }">Edit</RouterLink>
    </div>

    <div class="relative">
      <RouterView v-slot="{ Component, route }" :event="GStore.event">
        <transition :name="route.meta.transitionName">
          <Component :is="Component" class="absolute" />
        </transition>
      </RouterView>
    </div>
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

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
</style>
