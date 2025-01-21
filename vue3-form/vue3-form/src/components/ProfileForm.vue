<script setup>
import { ref, computed } from 'vue'
import CheckboxGroup from './CheckboxGroup.vue'
import TagGroup from './TagGroup.vue'
import InputPassword from './InputPassword.vue'
import InputFile from './InputFile.vue'
import InputString from './InputString.vue'
import InputNumber from './InputNumber.vue'
import InputTextarea from './InputTextarea.vue'
import InputSelect from './InputSelect.vue'
import InputRadioGroup from './InputRadioGroup.vue'

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  hobbyOptions: {
    type: Array,
    default: () => [],
  },
  regionOptions: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits([
  'update:name',
  'update:phone',
  'update:date',
  'update:time',
  'update:gender',
  'update:hobbies',
  'update:hobbyOptions',
  'update:tags',
  'update:residence',
  'update:age',
  'update:email',
  'update:password',
  'update:feeling',
  'update:note',
  'update:imageUrl',
  'submit',
  'reset',
])

// const test = computed(() => {
//   try {
//     return props.form.hobbies.includes(choice)
//   } catch (error) {
//     console.log(props.form)
//   }
// })

// hobby options
const inputHobby = ref('') // 因為是選配所以在外面處理
// function addHobbyOption() {
//   if (inputHobby.value.trim() === '') {
//     return
//   }

//   // choices.value.push(inputHobby.value)
//   const newHobby = inputHobby.value

//   inputHobby.value = null

//   return newHobby
// }

// ???這些computed為什麼不是在有資料的地方處理?
const showedHobbies = computed(() => {
  return hobbies.value.join(', ')
})

// tag
const showedTags = computed(() => {
  return props.form.tags.join(', ')
})

// password

const oneLineNote = computed(() => {
  const noteLines = note.value.split('\n')
  return noteLines.join('\\n')
})
</script>

<template>
  <form @submit.prevent="emits('submit')" @reset.prevent="emits('reset')">
    <InputString
      placeholder="橘子"
      label="姓名"
      type="text"
      :value="props.form.name"
      @input="
        emits('update:name', {
          ...props.form,
          name: $event,
        })
      "
    ></InputString>

    <InputString
      placeholder="0912345678"
      label="電話"
      type="tel"
      :value="props.form.phone"
      @input="
        emits('update:phone', {
          ...props.form,
          phone: $event,
        })
      "
    ></InputString>

    <InputString
      label="日期"
      type="date"
      :value="props.form.date"
      @input="
        emits('update:date', {
          ...props.form,
          date: $event,
        })
      "
    ></InputString>

    <InputString
      label="時間"
      type="time"
      :value="props.form.time"
      @input="
        emits('update:time', {
          ...props.form,
          time: $event,
        })
      "
    ></InputString>

    <InputRadioGroup
      legend="生理性別"
      name="gender"
      :radioOptions="['生理女', '生理男']"
      :checkedValue="props.form.gender"
      @change="
        emits('update:gender', {
          ...props.form,
          gender: $event,
        })
      "
    ></InputRadioGroup>

    <CheckboxGroup
      :value="props.form.hobbies"
      :options="hobbyOptions"
      @change="
        emits('update:hobbies', {
          ...props.form,
          hobbies: $event,
        })
      "
      v-slot="{ onAddOption }"
    >
      <div class="input-field">
        <input type="text" v-model="inputHobby" />
        <button class="btn-add" @click="emits('update:hobbyOptions', onAddOption(inputHobby))">
          新增
        </button>
      </div>
      <!-- <div class="input-field">
      <input type="text" v-model="newOption" />
      <button class="btn-add" @click="emits('create:options', [...props.options, onCreate()])">
        新增
      </button>
    </div> -->
    </CheckboxGroup>

    <TagGroup
      :value="props.form.tags"
      @create="emits('update:tags', { ...props.form, tags: $event })"
      @delete="emits('update:tags', { ...props.form, tags: $event })"
    >
    </TagGroup>

    <InputSelect
      label="居住地"
      :value="props.form.residence"
      @change="
        emits('update:residence', {
          ...props.form,
          residence: $event,
        })
      "
      :options="props.regionOptions"
    ></InputSelect>

    <InputNumber
      label="年齡"
      type="number"
      min="0"
      :value="props.form.age"
      @input="
        emits('update:age', {
          ...props.form,
          age: $event,
        })
      "
    >
    </InputNumber>

    <InputString
      label="email"
      type="email"
      placeholder="tangerine@15t.com"
      :value="props.form.email"
      @input="
        emits('update:email', {
          ...props.form,
          email: $event,
        })
      "
    ></InputString>

    <InputPassword
      :value="props.form.password"
      @input="
        emits('update:password', {
          ...props.form,
          password: $event,
        })
      "
    ></InputPassword>

    <InputNumber
      label="體驗感受"
      type="range"
      min="1"
      max="5"
      :value="props.form.feeling"
      @input="
        emits('update:feeling', {
          ...props.form,
          feeling: $event,
        })
      "
    >
      <span>{{ props.form.feeling }}分</span>
    </InputNumber>

    <InputTextarea
      label="備註："
      rows="3"
      :value="props.form.note"
      @input="
        emits('update:note', {
          ...props.form,
          note: $event,
        })
      "
    ></InputTextarea>

    <InputFile
      :imageUrl="props.form.imageUrl"
      @change="
        emits('update:imageUrl', {
          ...props.form,
          imageUrl: $event,
        })
      "
    >
    </InputFile>

    <div class="input-buttons">
      <input id="submit" type="submit" />
      <input id="reset" type="reset" class="btn-reset" />
    </div>
  </form>
</template>
