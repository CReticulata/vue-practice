<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'

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
})

const emits = defineEmits(['change'])

const uuid = ref(UniqueID().getID())
</script>

<template>
  <div class="input-field">
    <label :for="uuid">請選擇{{ props.label }}：</label>
    <select :id="uuid" :value="props.value" @change="emits('change', $event.target.value)">
      <option disabled :value="'請選擇'">請選擇</option>
      <option v-for="(option, index) in props.options" :value="option" :key="index">
        {{ option }}
      </option>
    </select>
  </div>
</template>
