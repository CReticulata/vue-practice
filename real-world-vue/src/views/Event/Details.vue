<script setup>
const props = defineProps({
  event: {
    // 從???
    type: Object,
    required: true,
  },
})
</script>

<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<style scoped></style>
