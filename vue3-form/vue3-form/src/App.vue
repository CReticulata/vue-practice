<script setup>
import { computed } from 'vue'
import { ref, useTemplateRef } from 'vue'
import ProfileForm from './components/ProfileForm.vue'

const form = ref({
  name: '',
  phone: '',
  date: getNowDate(),
  time: getNowTime(),
  gender: '',
  // choices: ['Pokemon Sleep', 'Pokemon TCG', 'Pokemon TCG Pocket'], // 為了hobbies的選項，維護資料用
  hobbies: [],
  // inputHobby: '', // 為了增加hobbies，維護資料用
  tags: [],
  // inputTag: '', // 為了增加tags，維護資料用
  // regions: ['基隆市', '台北市', '新北市', '台南市', '其他'],
  residence: '請選擇',
  age: null,
  email: '',
  password: '',
  // isShowingPassword: false, // 畫面邏輯
  // inputTypeForPassword: 'password',
  feeling: 3,
  note: '',
  imageUrl: '',
})

function onChangeHobbies(event) {
  const choice = event.target.value
  if (form.value.hobbies.includes(choice)) {
    const index = form.value.hobbies.findIndex((item) => item === choice)
    form.value.hobbies.splice(index, 1)
  } else {
    form.value.hobbies.push(choice)
  }
}

const name = ref('')
const phone = ref('')
// const date = ref('2025-01-13')
// const time = ref('01:01')

function addLeadingZero(time) {
  if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}

function getNowDate() {
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = addLeadingZero(now.getMonth() + 1)
  const nowDate = now.getDate()
  return `${nowYear}-${nowMonth}-${nowDate}`
}
const date = ref(getNowDate())
// const date = ref(new Date())

function getNowTime() {
  const now = new Date()
  const nowHour = addLeadingZero(now.getHours())
  const nowMinute = addLeadingZero(now.getMinutes())
  return `${nowHour}:${nowMinute}`
}

const time = ref(getNowTime())

const gender = ref('')

const choices = ref(['Pokemon Sleep', 'Pokemon TCG', 'Pokemon TCG Pocket'])

const hobbies = ref([])
const showedHobbies = computed(() => {
  return hobbies.value.join(', ')
})

const inputHobby = ref('')

function addHobby() {
  if (inputHobby.value.trim() === '') {
    return
  }

  choices.value.push(inputHobby.value)
  inputHobby.value = null
}

const tags = ref([])
const inputTag = ref('')
function addTag() {
  if (inputTag.value.trim() === '') {
    return
  }

  tags.value.push(inputTag.value)
  inputTag.value = null
}

function removeTag(index) {
  const indexOfTargetTag = index
  tags.value.splice(indexOfTargetTag, 1)
}

const showedTags = computed(() => {
  return tags.value.join(', ')
})

const regions = ref(['基隆市', '台北市', '新北市', '台南市', '其他'])
const residence = ref('請選擇')

const age = ref(null)
const email = ref('')
const password = ref('')
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

const feeling = ref(3)

const note = ref('')
const oneLineNote = computed(() => {
  const noteLines = note.value.split('\n')
  return noteLines.join('\\n')
})

const fileInput = useTemplateRef('fileInput')
const imageUrl = ref('')

function previewAvatar() {
  const inputImage = fileInput.value.files[0]
  form.value.imageUrl = URL.createObjectURL(inputImage)
}
</script>

<template>
  <header>
    <nav>
      <h1>表單</h1>
    </nav>
  </header>
  <main>
    <!-- 放表單 -->
    <form @submit.prevent>
      <div class="input-field">
        <label for="name">請輸入姓名：</label>
        <input
          id="name"
          type="text"
          placeholder="橘子"
          :value="form.name"
          @input="form.name = $event.target.value"
        />
      </div>
      <div class="input-field">
        <label for="phone">請輸入電話：</label>
        <input
          id="phone"
          type="tel"
          placeholder="0912345678"
          :value="form.phone"
          @input="form.phone = $event.target.value"
        />
      </div>
      <div class="input-field">
        <label for="date">請輸入日期：</label>
        <input id="date" type="date" :value="form.date" @input="form.date = $event.target.value" />
      </div>
      <div class="input-field">
        <label for="time">請輸入時間：</label>
        <input id="time" type="time" :value="form.time" @input="form.time = $event.target.value" />
      </div>
      <fieldset>
        <legend>請選擇生理性別：</legend>
        <div class="input-field input-choice">
          <input
            id="female"
            type="radio"
            :value="form.gender"
            @input="form.gender = $event.target.value"
            name="gender"
            value="生理女"
          />
          <label for="female">生理女</label>
        </div>
        <div class="input-field input-choice">
          <input
            id="male"
            type="radio"
            :value="form.gender"
            @input="form.gender = $event.target.value"
            name="gender"
            value="生理男"
          />
          <label for="male">生理男</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>請選擇興趣：</legend>
        <div class="input-field input-choice" v-for="(choice, index) in choices" :key="index">
          <input
            :id="choice"
            type="checkbox"
            :checked="form.hobbies.includes(choice)"
            @change="onChangeHobbies"
            :value="choice"
          />
          <label :for="choice">{{ choice }}</label>
        </div>
        <div class="input-field">
          <input type="text" v-model="inputHobby" />
          <button class="btn-add" @click="addHobby">新增興趣</button>
        </div>
      </fieldset>
      <div class="input-field">
        <div class="tags">
          <div class="tag" v-for="(tag, index) in tags" :key="index">
            <span>{{ tag }}</span>
            <span @click="removeTag(index)"><i class="fa-solid fa-circle-xmark"></i></span>
          </div>
        </div>
        <label for="tag">請新增標籤：</label>
        <input id="tag" type="text" v-model="inputTag" />
        <button class="btn-add" @click="addTag">新增標籤</button>
      </div>
      <div class="input-field">
        <label for="location">請選擇居住地：</label>
        <select
          id="location"
          :value="form.residence"
          @change="form.residence = $event.target.value"
        >
          <option disabled :value="'請選擇'">請選擇</option>
          <option v-for="(region, index) in regions" :value="region" :key="index">
            {{ region }}
          </option>
        </select>
      </div>
      <div class="input-field">
        <label for="age">請輸入年齡：</label>
        <input
          id="age"
          type="number"
          :value="form.age"
          @input="form.age = Number($event.target.value)"
          min="0"
        />
      </div>
      <div class="input-field">
        <label for="email">請輸入email：</label>
        <input
          id="email"
          type="email"
          placeholder="tangerine@15t.com"
          :value="form.email"
          @input="form.email = $event.target.value"
        />
      </div>
      <div class="input-field">
        <label for="password">請輸入密碼：</label>
        <input
          id="password"
          :type="inputTypeForPassword"
          :value="form.password"
          @input="form.password = $event.target.value"
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
          :value="form.feeling"
          @input="form.feeling = Number($event.target.value)"
          min="1"
          max="5"
        />
        <label for="feeling">{{ feeling }}分</label>
      </div>
      <div>
        <label for="note">備註：</label>
        <textarea
          class="textarea"
          id="note"
          :value="form.note"
          @input="form.note = $event.target.value"
          rows="3"
        >
        </textarea>
      </div>
      <div class="input-field">
        <div></div>
        <label for="avatar">上傳大頭貼：</label>
        <input class="input-file" id="avatar" type="file" ref="fileInput" @change="previewAvatar" />
        <img :src="form.imageUrl" />
      </div>
      <div class="input-buttons">
        <input id="submit" type="submit" />
        <input id="reset" type="reset" class="btn-reset" />
      </div>
    </form>

    <ProfileForm
      :form="form"
      :hobbyOptions="choices"
      :regionOptions="regions"
      @update:name="form = $event"
      @update:phone="form = $event"
      @update:date="form = $event"
      @update:time="form = $event"
      @update:gender="form = $event"
      @update:hobbies="form = $event"
      @update:tags="form = $event"
      @update:residence="form = $event"
      @update:age="form = $event"
      @update:email="form = $event"
      @update:password="form = $event"
      @update:feeling="form = $event"
      @update:note="form = $event"
      @update:imageUrl="form = $event"
      @update:hobbyOptions="choices = $event"
    ></ProfileForm>

    <!-- 放預覽 -->
    <div class="preview">
      <div>姓名：{{ name }}</div>
      <div>電話：{{ phone }}</div>
      <div>日期、時間：{{ date }} {{ time }}</div>
      <div>性別：{{ gender }}</div>
      <div>興趣：{{ showedHobbies }}</div>
      <div>標籤：{{ showedTags }}</div>
      <div>居住地：{{ residence }}</div>
      <div>年齡：{{ age }}</div>
      <div>email：{{ email }}</div>
      <div>password：{{ password }}</div>
      <div>體驗感受：{{ feeling }}分</div>
      <div>備註：{{ oneLineNote }}</div>
      <div>
        大頭貼預覽：
        <div class="preview-image" v-if="imageUrl">
          <img :src="imageUrl" />
        </div>
      </div>
      <pre>{{ form }}</pre>
    </div>
  </main>
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 30px;
  text-align: center;
  margin-top: 2rem;
}

h1 {
  font-size: 30px;
  margin: 20px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 1024px) {
  main {
    flex-direction: row-reverse;
  }

  main > * {
    flex: 1;
    width: 400px;
    text-wrap: wrap;
  }
}

.input-field > * {
  vertical-align: middle;
}

.input-choice > :nth-child(n + 2) {
  margin-left: 3px;
}

.btn-add {
  line-height: 20px;
  margin-left: 5px;
}

.tags {
  display: flex;
  gap: 5px;

  height: 20px;
}
.tag {
  display: flex;
  gap: 2px;
}

.icon-eye {
  margin-left: 5px;
  cursor: pointer;
}

.textarea {
  width: 100%;
}

.input-file {
  cursor: pointer;
}

.preview-image {
  width: 200px;
  height: 200px;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.input-buttons {
  padding: 20px 0;
}

.btn-reset {
  color: red;
}
</style>
