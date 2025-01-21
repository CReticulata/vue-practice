<script setup>
import InputRadio from './InputRadio.vue'

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
})

const emits = defineEmits(['change'])
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
      @change="emits('change', $event)"
    ></InputRadio>
  </fieldset>
</template>
