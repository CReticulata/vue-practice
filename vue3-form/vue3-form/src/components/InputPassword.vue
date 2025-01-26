<script setup>
import ErrorMessage from '../components/ErrorMessage.vue'
import { watch } from 'vue'
import { ref } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(['input'])

const isShow = ref(false)
const type = ref('password')

const typeOptions = ['password', 'text']

// function toggleType() {
//   isShow.value = !isShow.value

//   type.value = typeOptions[Number(isShow.value)]
// }

watch(isShow, (newValue) => {
  type.value = typeOptions[Number(newValue)]
})

const { value: fieldValue } = useField('password')

function updatePassword(event) {
  fieldValue.value = event.target.value

  return emits('input', event.target.value)
}
</script>
<template>
  <div class="input-field">
    <label for="password">請輸入密碼：</label>
    <input id="password" :type="type" :value="props.value" @input="updatePassword" />
    <span class="icon-eye" v-if="!isShow" @click="isShow = !isShow">
      <i class="fa-solid fa-eye"></i>
    </span>
    <span class="icon-eye" v-if="isShow" @click="isShow = !isShow">
      <i class="fa-solid fa-eye-slash"></i>
    </span>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
