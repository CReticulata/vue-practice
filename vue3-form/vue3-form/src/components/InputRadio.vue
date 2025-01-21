<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  checkedValue: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['change'])

const uuid = ref(UniqueID().getID())
</script>

<template>
  <div class="input-field input-choice">
    <input
      :id="uuid"
      type="radio"
      :checked="props.checkedValue === props.value"
      @change="emits('change', $event.target.value)"
      :name="props.name"
      :value="props.value"
    />
    <label :for="uuid">{{ props.value }}</label>
  </div>
</template>
