<script setup>
import InputRadio from './InputRadio.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  legend: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  radioOptions: {
    type: Array,
    required: true,
  },
  checkedValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(['change'])

const { value: fieldValue } = useField(() => props.name)

function updateValue(event) {
  fieldValue.value = event

  return emits('change', event)
}
</script>

<template>
  <fieldset>
    <legend>請選擇{{ props.legend }}：</legend>

    <InputRadio
      :name="props.name"
      v-for="(option, index) in props.radioOptions"
      :value="option"
      :key="index"
      :checkedValue="props.checkedValue"
      @change="updateValue"
    ></InputRadio>

    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </fieldset>
</template>
