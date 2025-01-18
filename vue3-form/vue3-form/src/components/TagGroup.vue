<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['create', 'delete'])

const inputTag = ref('')
function addTag() {
  if (inputTag.value == null || inputTag.value.trim() === '') {
    return
  }

  const newTag = inputTag.value

  inputTag.value = null

  console.log([...props.value, newTag])
  return emits('create', [...props.value, newTag])
}
</script>
<template>
  <div class="input-field">
    <div class="tags">
      <div class="tag" v-for="(tag, index) in props.value" :key="index">
        <span>{{ tag }}</span>
        <span
          @click="
            emits('delete', [...props.value.slice(0, index), ...props.value.slice(index + 1)])
          "
          ><i class="fa-solid fa-circle-xmark"></i
        ></span>
      </div>
    </div>
    <label for="tag">請新增標籤：</label>
    <input id="tag" type="text" v-model="inputTag" />
    <button class="btn-add" @click="addTag">新增標籤</button>
  </div>
</template>
