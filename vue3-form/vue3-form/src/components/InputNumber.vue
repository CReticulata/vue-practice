<script setup>
import { ref } from 'vue'
import UniqueID from '@/features/UniqueID'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
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
  error: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(['input'])

const uuid = ref(UniqueID().getID())

const { value: fieldValue } = useField(() => props.name)

function updateValue(event) {
  fieldValue.value = event.target.value

  return emits('input', Number(event.target.value))
}
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
      @input="updateValue"
    />
    <slot></slot>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
