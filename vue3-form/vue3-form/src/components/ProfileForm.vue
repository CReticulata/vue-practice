<script setup>
import { ref, computed, useTemplateRef } from 'vue'

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
])

// const test = computed(() => {
//   try {
//     return props.form.hobbies.includes(choice)
//   } catch (error) {
//     console.log(props.form)
//   }
// })

function onChangeHobbies(event) {
  const choice = event.target.value
  if (props.form.hobbies.includes(choice)) {
    const index = props.form.hobbies.findIndex((item) => item === choice)
    // props.form.value.hobbies.splice(index, 1)
    return [...props.form.hobbies.slice(0, index), ...props.form.hobbies.slice(index + 1)]
  } else {
    // props.form.value.hobbies.push(choice)
    return [...props.form.hobbies, choice]
  }
}

const fileInput = useTemplateRef('fileInput')
function previewAvatar() {
  const inputImage = fileInput.value.files[0]
  return URL.createObjectURL(inputImage)
}

// hobby options
const inputHobby = ref('')
function addHobbyOption() {
  if (inputHobby.value.trim() === '') {
    return
  }

  // choices.value.push(inputHobby.value)
  const newHobby = inputHobby.value

  inputHobby.value = null

  return newHobby
}

// tag
const inputTag = ref('')
function addTag() {
  if (inputTag.value.trim() === '') {
    return
  }

  // tags.value.push(inputTag.value)
  const newTag = inputTag.value

  inputTag.value = null

  return [...props.form.tags, newTag]
}

function removeTag(index) {
  // const indexOfTargetTag = index
  // tags.value.splice(indexOfTargetTag, 1)
  return [...props.form.tags.slice(0, index), ...props.form.tags.slice(index + 1)]
}

const showedTags = computed(() => {
  return props.form.tags.join(', ')
})

// password
const isShowingPassword = ref(false)
const inputTypeForPassword = ref('password')

function togglePassword() {
  isShowingPassword.value = !isShowingPassword.value

  if (inputTypeForPassword.value === 'password') {
    inputTypeForPassword.value = 'text'
  } else {
    inputTypeForPassword.value = 'password'
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="input-field">
      <label for="name">請輸入姓名：</label>
      <input
        id="name"
        type="text"
        placeholder="橘子"
        :value="props.form.name"
        @input="
          emits('update:name', {
            ...props.form,
            name: $event.target.value,
          })
        "
      />
    </div>
    <div class="input-field">
      <label for="phone">請輸入電話：</label>
      <input
        id="phone"
        type="tel"
        placeholder="0912345678"
        :value="props.form.phone"
        @input="
          emits('update:phone', {
            ...props.form,
            phone: $event.target.value,
          })
        "
      />
    </div>
    <div class="input-field">
      <label for="date">請輸入日期：</label>
      <input
        id="date"
        type="date"
        :value="props.form.date"
        @input="
          emits('update:date', {
            ...props.form,
            date: $event.target.value,
          })
        "
      />
    </div>
    <div class="input-field">
      <label for="time">請輸入時間：</label>
      <input
        id="time"
        type="time"
        :value="props.form.time"
        @input="
          emits('update:time', {
            ...props.form,
            time: $event.target.value,
          })
        "
      />
    </div>
    <fieldset>
      <legend>請選擇生理性別：</legend>
      <div class="input-field input-choice">
        <input
          id="female"
          type="radio"
          :checked="props.form.gender === '生理女'"
          @change="
            emits('update:gender', {
              ...props.form,
              gender: $event.target.value,
            })
          "
          name="gender"
          value="生理女"
        />
        <label for="female">生理女</label>
      </div>
      <div class="input-field input-choice">
        <input
          id="male"
          type="radio"
          :checked="props.form.gender === '生理男'"
          @change="
            emits('update:gender', {
              ...props.form,
              gender: $event.target.value,
            })
          "
          name="gender"
          value="生理男"
        />
        <label for="male">生理男</label>
      </div>
    </fieldset>
    <fieldset>
      <legend>請選擇興趣：</legend>
      <div class="input-field input-choice" v-for="(choice, index) in hobbyOptions" :key="index">
        <input
          :id="choice"
          type="checkbox"
          :checked="props.form.hobbies.includes(choice)"
          @change="
            emits('update:hobbies', {
              ...props.form,
              hobbies: onChangeHobbies($event),
            })
          "
          :value="choice"
        />
        <label :for="choice">{{ choice }}</label>
      </div>
      <div class="input-field">
        <input type="text" v-model="inputHobby" />
        <button
          class="btn-add"
          @click="emits('update:hobbyOptions', [...props.hobbyOptions, addHobbyOption()])"
        >
          新增興趣
        </button>
      </div>
    </fieldset>
    <div class="input-field">
      <div class="tags">
        <div class="tag" v-for="(tag, index) in props.form.tags" :key="index">
          <span>{{ tag }}</span>
          <span @click="emits('update:tags', { ...props.form, tags: removeTag(index) })"
            ><i class="fa-solid fa-circle-xmark"></i
          ></span>
        </div>
      </div>
      <label for="tag">請新增標籤：</label>
      <input id="tag" type="text" v-model="inputTag" />
      <button class="btn-add" @click="emits('update:tags', { ...props.form, tags: addTag() })">
        新增標籤
      </button>
    </div>
    <div class="input-field">
      <label for="location">請選擇居住地：</label>
      <select
        id="location"
        :value="props.form.residence"
        @change="
          emits('update:residence', {
            ...props.form,
            residence: $event.target.value,
          })
        "
      >
        <option disabled :value="'請選擇'">請選擇</option>
        <option v-for="(region, index) in props.regionOptions" :value="region" :key="index">
          {{ region }}
        </option>
      </select>
    </div>
    <div class="input-field">
      <label for="age">請輸入年齡：</label>
      <input
        id="age"
        type="number"
        :value="props.form.age"
        @input="
          emits('update:age', {
            ...props.form,
            age: Number($event.target.value),
          })
        "
        min="0"
      />
    </div>
    <div class="input-field">
      <label for="email">請輸入email：</label>
      <input
        id="email"
        type="email"
        placeholder="tangerine@15t.com"
        :value="props.form.email"
        @input="
          emits('update:email', {
            ...props.form,
            email: $event.target.value,
          })
        "
      />
    </div>
    <div class="input-field">
      <label for="password">請輸入密碼：</label>
      <input
        id="password"
        :type="inputTypeForPassword"
        :value="props.form.password"
        @input="
          emits('update:password', {
            ...props.form,
            password: $event.target.value,
          })
        "
      />
      <span class="icon-eye" v-if="!isShowingPassword" @click="togglePassword">
        <i class="fa-solid fa-eye"></i>
      </span>
      <span class="icon-eye" v-if="isShowingPassword" @click="togglePassword">
        <i class="fa-solid fa-eye-slash"></i>
      </span>
    </div>
    <div class="input-field">
      <span>請選擇體驗感受：</span>
      <input
        id="feeling"
        type="range"
        :value="props.form.feeling"
        @input="
          emits('update:feeling', {
            ...props.form,
            feeling: Number($event.target.value),
          })
        "
        min="1"
        max="5"
      />
      <label for="feeling">{{ props.form.feeling }}分</label>
    </div>
    <div>
      <label for="note">備註：</label>
      <textarea
        class="textarea"
        id="note"
        :value="props.form.note"
        @input="
          emits('update:note', {
            ...props.form,
            note: $event.target.value,
          })
        "
        rows="3"
      >
      </textarea>
    </div>
    <div class="input-field">
      <div></div>
      <label for="avatar">上傳大頭貼：</label>
      <input
        class="input-file"
        id="avatar"
        type="file"
        ref="fileInput"
        @change="
          emits('update:imageUrl', {
            ...props.form,
            imageUrl: previewAvatar(),
          })
        "
      />
      <img :src="props.form.imageUrl" />
    </div>
    <div class="input-buttons">
      <input id="submit" type="submit" />
      <input id="reset" type="reset" class="btn-reset" />
    </div>
  </form>
</template>
