<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  rows: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['input'])

const uuid = ref(UniqueID().getID())
</script>

<template>
  <div>
    <label :for="uuid">{{ props.label }}</label>
    <textarea
      class="textarea"
      :id="uuid"
      :rows="props.rows"
      :value="props.value"
      @input="emits('input', $event.target.value)"
    >
    </textarea>
  </div>
</template>
