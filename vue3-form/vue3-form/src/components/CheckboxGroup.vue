<script setup>
import { ref, computed } from 'vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  error: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['change', 'create:options'])

function onChange(event) {
  const choice = event.target.value
  if (props.value.includes(choice)) {
    const index = props.value.findIndex((item) => item === choice)
    // props.form.value.hobbies.splice(index, 1)
    return [...props.value.slice(0, index), ...props.value.slice(index + 1)]
  } else {
    // props.form.value.hobbies.push(choice)
    return [...props.value, choice]
  }
}

function onAddOption(options) {
  return (inputOption) => {
    if (inputOption.trim() === '') {
      return [...options]
    }

    if (options.includes(inputOption)) {
      return [...options]
    }

    // choices.value.push(inputHobby.value)
    const newOption = inputOption

    inputOption = null

    return [...options, newOption]
  }
}

const { value: value } = useField(() => props.label)

function updateValue(event) {
  value.value = onChange(event)

  return emits('change', onChange(event))
}
</script>

<template>
  <fieldset>
    <legend>請選擇{{ props.label }}：</legend>
    <div class="input-field input-choice" v-for="(choice, index) in props.options" :key="index">
      <input
        :id="choice"
        type="checkbox"
        :checked="props.value.includes(choice)"
        @change="updateValue"
        :value="choice"
      />
      <label :for="choice">{{ choice }}</label>
    </div>
    <slot :onAddOption="onAddOption(props.options)"></slot>
    <ErrorMessage v-if="props.error">{{ props.error }}</ErrorMessage>
  </fieldset>
</template>

<script>
// const newOption = ref('')
// function onCreate() {
//   if (newOption.value.trim() === '') {
//     return
//   }

//   // choices.value.push(inputHobby.value)
//   const newHobby = newOption.value

//   newOption.value = null

//   return newHobby
// }
</script>
