<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const GStore = inject('GStore')
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

function register() {
  GStore.flashMessage = `You are successfully registered for ${props.event.title}`
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)

  router.push({ name: 'EventDetails' })
  // router.go(-1)
}
</script>

<template>
  <div>
    <p>Register for the event here</p>
    <button @click="register" class="btn-register">Register Me</button>
  </div>
</template>

<style scoped>
.btn-register {
  width: 100px;
  margin: 20px auto 0;
  padding: 3px;

  background-color: hsla(160, 100%, 37%, 0.5);
  border-radius: 5px;
  border: 1px solid var(--color-border);
}

.btn-register:hover {
  background-color: hsla(160, 100%, 37%, 1);
}
</style>
