<script setup>
import { ref } from 'vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '標籤',
  },
  value: {
    type: Array,
    default: () => [],
  },
  error: {
    type: String,
    default: '',
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

  updateValue([...props.value, newTag])
  // console.log([...props.value, newTag])
  return emits('create', [...props.value, newTag])
}

function removeTag(index) {
  updateValue([...props.value.slice(0, index), ...props.value.slice(index + 1)])

  return emits('delete', [...props.value.slice(0, index), ...props.value.slice(index + 1)])
}

const { value: fieldValue } = useField(() => props.name)

function updateValue(newValue) {
  fieldValue.value = newValue
}
</script>
<template>
  <div class="input-field">
    <div class="tags">
      <div class="tag" v-for="(tag, index) in props.value" :key="index">
        <span>{{ tag }}</span>
        <span @click="removeTag(index)"><i class="fa-solid fa-circle-xmark"></i></span>
      </div>
    </div>
    <label for="tag">請新增{{ props.label }}：</label>
    <input id="tag" type="text" v-model="inputTag" />
    <button class="btn-add" @click="addTag">新增{{ props.label }}</button>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
