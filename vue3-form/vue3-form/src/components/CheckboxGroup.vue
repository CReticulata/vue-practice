<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
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
  return (inputHobby) => {
    if (inputHobby.trim() === '') {
      return
    }

    // choices.value.push(inputHobby.value)
    const newHobby = inputHobby

    inputHobby = null

    return [...options, newHobby]
  }
}
</script>

<template>
  <fieldset>
    <legend>請選擇：</legend>
    <div class="input-field input-choice" v-for="(choice, index) in props.options" :key="index">
      <input
        :id="choice"
        type="checkbox"
        :checked="props.value.includes(choice)"
        @change="emits('change', onChange($event))"
        :value="choice"
      />
      <label :for="choice">{{ choice }}</label>
    </div>
    <slot :onAddOption="onAddOption(props.options)"></slot>
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
