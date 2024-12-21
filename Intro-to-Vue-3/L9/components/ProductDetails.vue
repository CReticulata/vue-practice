<template>
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
</template>

<script>
export default {
  components: {
    ProductDetails,
  },
  props: {
    details: Array,
  },
};
</script>
