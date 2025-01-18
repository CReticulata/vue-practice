<script setup>
import { watch } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
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
</script>
<template>
  <div class="input-field">
    <label for="password">請輸入密碼：</label>
    <input
      id="password"
      :type="type"
      :value="props.value"
      @input="emits('input', $event.target.value)"
    />
    <span class="icon-eye" v-if="!isShow" @click="isShow = !isShow">
      <i class="fa-solid fa-eye"></i>
    </span>
    <span class="icon-eye" v-if="isShow" @click="isShow = !isShow">
      <i class="fa-solid fa-eye-slash"></i>
    </span>
  </div>
</template>
