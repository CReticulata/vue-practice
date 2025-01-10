<script setup>
const props = defineProps({
  event: {
    // 從RouterView來
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<style scoped></style>
