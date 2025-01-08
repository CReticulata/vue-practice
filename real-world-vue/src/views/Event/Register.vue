<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function register() {
  router.push({ name: 'EventDetails' })
  // router.go(-1)
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register" class="btn-register">Register Me</button>
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
