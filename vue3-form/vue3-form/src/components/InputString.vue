<script setup>
import UniqueID from '../features/UniqueID'
import ErrorMessage from '../components/ErrorMessage.vue'
import { ref } from 'vue'
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
  isLazyValidate: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['input'])

const uuid = ref(UniqueID().getID())

// fieldValue
const { value: fieldValue } = useField(() => props.name)

function updateValue(event) {
  fieldValue.value = event.target.value

  return emits('input', event.target.value)
}
</script>
<template>
  <div class="input-field">
    <label :for="uuid">請輸入{{ props.label }}：</label>
    <input
      v-if="!isLazyValidate"
      :id="uuid"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.value"
      @input="updateValue"
    />
    <!-- v-if決定input還是change -->
    <input
      v-if="isLazyValidate"
      :id="uuid"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.value"
      @change="updateValue"
    />
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </div>
</template>
