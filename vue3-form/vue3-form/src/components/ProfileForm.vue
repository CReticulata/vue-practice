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
import { useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'

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

// hobby options
const inputHobby = ref('') // 因為是選配所以在外面處理

// ???這些computed為什麼不是在有資料的地方處理?
const showedHobbies = computed(() => {
  return hobbies.value.join(', ')
})

const showedTags = computed(() => {
  return props.form.tags.join(', ')
})

const oneLineNote = computed(() => {
  const noteLines = note.value.split('\n')
  return noteLines.join('\\n')
})

// validation
const validationSchema = object({
  name: string().required('請勿空白'),
  phone: string().required('請勿空白'),
  date: string().required('請勿空白'),
  time: string().required('請勿空白'),
  gender: string().required('請勿空白'),
  hobbies: array().min(1, '必須至少選擇一項'),
  tags: array().min(1, '必須至少新增一項'),
  age: number().min(0, '不得低於0').required('請勿空白'),
  residence: string().required('請勿空白'),
  email: string().email('輸入的email格式錯誤').required('請勿空白'),
  password: string().required('請勿空白'),
  feeling: number().required('請勿空白'),
  note: string(),
  imageUrl: string().required('請勿空白'),
})

const { handleSubmit, errors } = useForm({
  validationSchema: validationSchema,
  initialValues: {
    date: props.form.date,
    time: props.form.time,
    feeling: 3,
  },
})

const onSubmit = handleSubmit((values) => {
  console.log(values)

  return emits('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" @reset.prevent="emits('reset')">
    <InputString
      name="name"
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
      :error="errors['name']"
    ></InputString>

    <InputString
      name="phone"
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
      :error="errors['phone']"
    ></InputString>

    <InputString
      name="date"
      label="日期"
      type="date"
      :value="props.form.date"
      @input="
        emits('update:date', {
          ...props.form,
          date: $event,
        })
      "
      :error="errors['date']"
    ></InputString>

    <InputString
      name="time"
      label="時間"
      type="time"
      :value="props.form.time"
      @input="
        emits('update:time', {
          ...props.form,
          time: $event,
        })
      "
      :error="errors['time']"
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
      :error="errors['gender']"
    ></InputRadioGroup>

    <CheckboxGroup
      name="hobbies"
      label="興趣"
      :value="props.form.hobbies"
      :options="hobbyOptions"
      @change="
        emits('update:hobbies', {
          ...props.form,
          hobbies: $event,
        })
      "
      v-slot="{ onAddOption }"
      :error="errors['hobbies']"
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
      name="tags"
      :value="props.form.tags"
      @create="emits('update:tags', { ...props.form, tags: $event })"
      @delete="emits('update:tags', { ...props.form, tags: $event })"
      :error="errors['tags']"
    >
    </TagGroup>

    <InputSelect
      name="residence"
      label="居住地"
      :value="props.form.residence"
      @change="
        emits('update:residence', {
          ...props.form,
          residence: $event,
        })
      "
      :options="props.regionOptions"
      :error="errors['residence']"
    ></InputSelect>

    <InputNumber
      name="age"
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
      :error="errors['age']"
    >
    </InputNumber>

    <InputString
      name="email"
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
      :error="errors['email']"
      isLazyValidate
    ></InputString>

    <InputPassword
      :value="props.form.password"
      @input="
        emits('update:password', {
          ...props.form,
          password: $event,
        })
      "
      :error="errors.password"
    ></InputPassword>

    <InputNumber
      name="feeling"
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
      :error="errors['feeling']"
    >
      <span>{{ props.form.feeling }}分</span>
    </InputNumber>

    <InputTextarea
      name="note"
      label="備註"
      rows="3"
      :value="props.form.note"
      @input="
        emits('update:note', {
          ...props.form,
          note: $event,
        })
      "
      :error="errors['note']"
    ></InputTextarea>

    <InputFile
      name="imageUrl"
      label="檔案"
      :imageUrl="props.form.imageUrl"
      @change="
        emits('update:imageUrl', {
          ...props.form,
          imageUrl: $event,
        })
      "
      :error="errors['imageUrl']"
    >
    </InputFile>

    <div class="input-buttons">
      <input id="submit" type="submit" />
      <input id="reset" type="reset" class="btn-reset" />
    </div>
  </form>
</template>
