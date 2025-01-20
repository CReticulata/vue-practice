<script setup>
import { ref } from 'vue'
import ProfileForm from './components/ProfileForm.vue'
import axios from 'axios'

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

const choices = ref(['Pokemon Sleep', 'Pokemon TCG', 'Pokemon TCG Pocket'])
const regions = ref(['基隆市', '台北市', '新北市', '台南市', '其他'])

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

function getNowTime() {
  const now = new Date()
  const nowHour = addLeadingZero(now.getHours())
  const nowMinute = addLeadingZero(now.getMinutes())
  return `${nowHour}:${nowMinute}`
}

function submitForm() {
  axios
    .post('https://my-json-server.typicode.com/Code-Pop/Vue-3-Forms/events', form.value)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
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
    <ProfileForm
      :form="form"
      @update:name="form = $event"
      @update:phone="form = $event"
      @update:date="form = $event"
      @update:time="form = $event"
      @update:gender="form = $event"
      :hobbyOptions="choices"
      @update:hobbyOptions="choices = $event"
      @update:hobbies="form = $event"
      @update:tags="form = $event"
      :regionOptions="regions"
      @update:residence="form = $event"
      @update:age="form = $event"
      @update:email="form = $event"
      @update:password="form = $event"
      @update:feeling="form = $event"
      @update:note="form = $event"
      @update:imageUrl="form = $event"
      @submit="submitForm"
      @reset=""
    ></ProfileForm>

    <!-- 放預覽 -->
    <div class="preview">
      <div>姓名：{{ form.name }}</div>
      <div>電話：{{ form.phone }}</div>
      <div>日期、時間：{{ form.date }} {{ form.time }}</div>
      <div>性別：{{ form.gender }}</div>
      <div>興趣：{{ showedHobbies }}</div>
      <div>標籤：{{ showedTags }}</div>
      <div>居住地：{{ form.residence }}</div>
      <div>年齡：{{ form.age }}</div>
      <div>email：{{ form.email }}</div>
      <div>password：{{ form.password }}</div>
      <div>體驗感受：{{ form.feeling }}分</div>
      <div>備註：{{ oneLineNote }}</div>
      <div>
        大頭貼預覽：
        <div class="preview-image" v-if="form.imageUrl">
          <img :src="form.imageUrl" />
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
