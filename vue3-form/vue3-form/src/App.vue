<script setup>
import { computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { ref, useTemplateRef } from 'vue'

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

const now = new Date()
const nowYear = now.getFullYear()
const nowMonth = addLeadingZero(now.getMonth() + 1)
const nowDate = now.getDate()
const date = ref(`${nowYear}-${nowMonth}-${nowDate}`)

const nowHour = addLeadingZero(now.getHours())
const nowMinute = addLeadingZero(now.getMinutes())
const time = ref(`${nowHour}:${nowMinute}`)

const gender = ref('')
const hobbies = ref([])
const showedHobbies = computed(() => {
  return hobbies.value.join(', ')
})

const regions = ref(['基隆市', '台北市', '新北市', '南部'])
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
  imageUrl.value = URL.createObjectURL(inputImage)
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
    <form class="form">
      <div class="input-text">
        <label for="name">請輸入姓名：</label>
        <input id="name" type="text" placeholder="橘子" v-model="name" />
      </div>
      <div class="input-text">
        <label for="phone">請輸入電話：</label>
        <input id="phone" type="tel" placeholder="0912345678" v-model="phone" />
      </div>
      <div class="input-text">
        <label for="date">請輸入日期：</label>
        <input id="date" type="date" v-model="date" />
      </div>
      <div class="input-text">
        <label for="time">請輸入時間：</label>
        <input id="time" type="time" v-model="time" />
      </div>
      <fieldset class="input-radio">
        <legend>請選擇生理性別：</legend>
        <div class="input-choice">
          <input id="female" type="radio" v-model="gender" value="生理女" />
          <label for="female">生理女</label>
        </div>
        <div class="input-choice">
          <input id="male" type="radio" v-model="gender" value="生理男" />
          <label for="male">生理男</label>
        </div>
      </fieldset>
      <fieldset class="input-radio">
        <legend>請選擇興趣：</legend>
        <div class="input-choice">
          <input id="Pokemon Sleep" type="checkbox" v-model="hobbies" value="Pokemon Sleep" />
          <label for="Pokemon Sleep">Pokemon Sleep</label>
        </div>
        <div class="input-choice">
          <input id="Pokemon TCG" type="checkbox" v-model="hobbies" value="Pokemon TCG" />
          <label for="Pokemon TCG">Pokemon TCG</label>
        </div>
        <div class="input-choice">
          <input
            id="Pokemon TCG Pocket"
            type="checkbox"
            v-model="hobbies"
            value="Pokemon TCG Pocket"
          />
          <label for="Pokemon TCG Pocket">Pokemon TCG Pocket</label>
        </div>
      </fieldset>
      <div class="select">
        <label for="location">請選擇居住地：</label>
        <select id="location" v-model="residence">
          <option disabled>請選擇</option>
          <option v-for="region in regions" :value="region">{{ region }}</option>
        </select>
      </div>
      <div class="input-text">
        <label for="age">請輸入年齡：</label>
        <input id="age" type="number" v-model.number="age" min="0" />
      </div>
      <div class="input-text">
        <label for="email">請輸入email：</label>
        <input id="email" type="email" placeholder="tangerine@15t.com" v-model="email" />
      </div>
      <div class="input-text">
        <label for="password">請輸入密碼：</label>
        <input id="password" :type="inputTypeForPassword" v-model="password" />
        <span class="icon-eye" v-if="!isShowingPassword" @click="togglePassword">
          <i class="fa-solid fa-eye"></i>
        </span>
        <span class="icon-eye" v-if="isShowingPassword" @click="togglePassword">
          <i class="fa-solid fa-eye-slash"></i>
        </span>
      </div>
      <div class="input-choice">
        <span>請選擇體驗感受：</span>
        <input id="feeling" type="range" v-model="feeling" min="1" max="5" />
        <label for="feeling">{{ feeling }}分</label>
      </div>
      <div class="textarea">
        <div>
          <label for="note">備註：</label>
        </div>
        <textarea id="note" v-model="note" rows="3"> </textarea>
      </div>
      <div class="input-file">
        <div>
          <label for="avatar">上傳大頭貼：</label>
        </div>
        <input id="avatar" type="file" ref="fileInput" @change="previewAvatar" />
      </div>
    </form>

    <!-- 放預覽 -->
    <div class="preview">
      <div>姓名：{{ name }}</div>
      <div>電話：{{ phone }}</div>
      <div>日期、時間：{{ date }} {{ time }}</div>
      <div>性別：{{ gender }}</div>
      <div>興趣：{{ showedHobbies }}</div>
      <div>標籤：</div>
      <div>居住地：{{ residence }}</div>
      <div>年齡：{{ age }}</div>
      <div>email：{{ email }}</div>
      <div>password：{{ password }}</div>
      <div>體驗感受：{{ feeling }}分</div>
      <div>備註：{{ oneLineNote }}</div>
      <div>
        大頭貼預覽：
        <div class="image-preview" v-if="imageUrl">
          <img :src="imageUrl" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
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

.input-text > * {
  vertical-align: middle;
}

.input-choice > * {
  vertical-align: middle;
}

.input-choice > input {
  margin-right: 5px;
}

.icon-eye {
  margin-left: 5px;
  cursor: pointer;
}

.textarea textarea {
  width: 100%;
}

.input-file input {
  cursor: pointer;
}

.image-preview {
  width: 200px;
  height: 200px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 1024px) {
  main {
    flex-direction: row-reverse;
  }

  main > * {
    flex: 1;
    min-width: 300px;
    max-width: 700px;
    text-wrap: wrap;
  }
}
</style>
