<script setup>
const props = defineProps({
  btns: {
    type: Array,
    required: true,
  },
})

// const modelValue = defineModel({
//   type: String,
// })

const modelTab = defineModel('tab', { type: String })
</script>

<template>
  <!-- 確定 q-tabs 可否改動樣式即可 -->
  <!-- 小心 blue-2 變數的使用 -->
  <q-tabs
    v-model="modelTab"
    dense
    indicator-color="transparent"
    active-bg-color="blue-2"
    align="justify"
    inline-label
  >
    <q-tab
      v-for="(btn, index) in props.btns"
      :key="index"
      :name="btn.name"
      :label="btn.label"
      :icon="modelTab === btn.name ? 'done' : undefined"
    ></q-tab>
  </q-tabs>
</template>

<style lang="scss" scoped>
.q-tabs {
  border: 1px solid #767680;
  border-radius: 8px;
}

// 這個可能會直接寫在 q-tab 上面
// 如果不是很複雜通常就會直接找 quasar 的 class 去改
// .btns {
//   color: #1a1833;
//   height: 40px;

//   // 這個可能會直接寫在 q-tab 上面
//   // 如果很指定，可以直接寫 style
//   &__btn {
//     flex: 1;
//   }
// }

.q-tab {
  color: #1a1833;
  height: 40px;

  flex: 1;
}

:deep(.q-tab__icon) {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

:deep(.q-tab) {
  padding: 0;
}
</style>
