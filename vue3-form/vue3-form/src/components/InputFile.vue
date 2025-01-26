<script setup>
import { useTemplateRef } from 'vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  error: {
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

const { value: fieldValue } = useField(() => props.name)

function updateValue(event) {
  fieldValue.value = event.target.value

  return emits('change', previewAvatar())
}
</script>

<template>
  <div class="input-field">
    <label for="avatar">上傳{{ props.label }}：</label>
    <input class="input-file" id="avatar" type="file" ref="fileInput" @change="updateValue" />
    <img :src="props.imageUrl" class="preview" />
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>

<style scoped>
.preview {
  height: 250px;
}
</style>
