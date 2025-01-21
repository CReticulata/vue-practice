<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  min: {
    type: String,
    default: null,
  },
  max: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(['input'])

const uuid = ref(UniqueID().getID())
</script>

<template>
  <div class="input-field">
    <label :for="uuid">請輸入{{ props.label }}：</label>
    <input
      :id="uuid"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :value="props.value"
      @input="emits('input', Number($event.target.value))"
    />
    <slot></slot>
  </div>
</template>
