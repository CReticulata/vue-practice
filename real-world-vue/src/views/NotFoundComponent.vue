<script setup>
const props = defineProps({
  // 從routing來
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
})
</script>

<template>
  <div class="not-found">
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <RouterLink :to="{ name: 'EventList' }">Back to the event list</RouterLink>
  </div>
</template>

<style>
.not-found {
  text-align: center;
}

@media (min-width: 1024px) {
  .not-found {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: calc(100vw / 2);
  }
}
</style>
