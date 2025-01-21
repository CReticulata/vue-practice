<script setup>
import { useTemplateRef } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['change'])

const fileInput = useTemplateRef('fileInput')

function previewAvatar() {
  const inputImage = fileInput.value.files[0]
  return URL.createObjectURL(inputImage)
}
</script>

<template>
  <div class="input-field">
    <label for="avatar">上傳檔案：</label>
    <input
      class="input-file"
      id="avatar"
      type="file"
      ref="fileInput"
      @change="emits('change', previewAvatar())"
    />
    <img :src="props.imageUrl" />
  </div>
</template>
