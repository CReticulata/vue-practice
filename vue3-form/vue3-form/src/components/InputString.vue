<script setup>
import UniqueID from '../features/UniqueID'
import ErrorMessage from '../components/ErrorMessage.vue'
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
  error: {
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
      :placeholder="props.placeholder"
      :value="props.value"
      @input="emits('input', $event.target.value)"
    />
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
