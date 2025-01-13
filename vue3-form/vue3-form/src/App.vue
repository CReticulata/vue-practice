<script setup>
import { computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { h } from 'vue'

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
    </form>
    <!-- 放預覽 -->
    <div class="preview">
      <div>姓名：{{ name }}</div>
      <div>電話：{{ phone }}</div>
      <div>日期、時間：{{ date }} {{ time }}</div>
      <div>性別：{{ gender }}</div>
      <div>興趣：{{ showedHobbies }}</div>
      <div>標籤：</div>
      <div>居住地：</div>
      <div>年齡：</div>
      <div>email：</div>
      <div>password：</div>
      <div>體驗感受：</div>
      <div>備註：</div>
      <div>大頭貼：</div>
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

@media (min-width: 1024px) {
  main {
    flex-direction: row-reverse;
  }

  main > * {
    flex: 1;
    min-width: 300px;
  }
}
</style>
