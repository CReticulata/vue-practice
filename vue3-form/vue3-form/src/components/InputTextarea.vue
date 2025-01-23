<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

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
  error: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['input'])

const uuid = ref(UniqueID().getID())

const { value: value } = useField(() => props.label)

function updateValue(event) {
  value.value = event.target.value

  return emits('input', event.target.value)
}
</script>

<template>
  <div>
    <label :for="uuid">{{ props.label }}：</label>
    <textarea
      class="textarea"
      :id="uuid"
      :rows="props.rows"
      :value="props.value"
      @input="updateValue"
    >
    </textarea>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
