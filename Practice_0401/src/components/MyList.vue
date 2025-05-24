<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '列表',
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <slot name="item" :item="item">
          {{ item.name || item.title || '無名稱' }}
        </slot>
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
