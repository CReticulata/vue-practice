<script setup>
import { ref } from 'vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import UniqueID from '@/features/UniqueID'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(['change'])

const uuid = ref(UniqueID().getID())

const { value: value } = useField(() => props.label)

function updateValue(event) {
  value.value = event.target.value

  return emits('change', event.target.value)
}
</script>

<template>
  <div class="input-field">
    <label :for="uuid">請選擇{{ props.label }}：</label>
    <select :id="uuid" :value="props.value" @change="updateValue">
      <option disabled :value="'請選擇'">請選擇</option>
      <option v-for="(option, index) in props.options" :value="option" :key="index">
        {{ option }}
      </option>
    </select>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
