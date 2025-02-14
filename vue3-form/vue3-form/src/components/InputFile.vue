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
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['change'])

const fileInput = useTemplateRef('fileInput')

// function blobToBase64(blob) {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result)
//     reader.readAsDataURL(blob)
//   })
// }

function previewAvatar() {
  const inputImage = fileInput.value.files[0]
  return URL.createObjectURL(inputImage)
  // return blobToBase64(inputImage)
}

const { value: fieldValue } = useField(() => props.name)

function updateValue(event) {
  fieldValue.value = event.target.value

  return emits('change', previewAvatar())
  // previewAvatar().then((base64) => emits('change', base64))
}
</script>

<template>
  <div class="input-field">
    <label for="avatar">上傳{{ props.label }}：</label>
    <input
      v-if="!disabled"
      class="input-file"
      id="avatar"
      type="file"
      ref="fileInput"
      @change="updateValue"
    />
    <img :src="props.imageUrl" class="preview" />
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>

<style scoped>
.preview {
  height: 250px;
}
</style>
