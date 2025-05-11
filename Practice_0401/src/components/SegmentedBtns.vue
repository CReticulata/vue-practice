<script setup>
const props = defineProps({
  btns: {
    type: Object,
    required: true,
  },
})

const value = defineModel()
</script>

<template>
  <q-card class="btns-box" flat>
    <q-tabs
      v-model="value"
      dense
      class="btns"
      indicator-color="transparent"
      active-bg-color="blue-2"
      align="justify"
      inline-label
    >
      <q-tab
        v-for="(btn, index) in props.btns"
        :key="index"
        class="btns__btn"
        :name="btn.name"
        :label="btn.label"
        :icon="value === btn.name ? 'done' : undefined"
      ></q-tab>
    </q-tabs>
  </q-card>
</template>

<style lang="scss" scoped>
.btns-box {
  border: 1px solid #767680;
  border-radius: 8px;
}

.btns {
  color: #1a1833;
  height: 40px;

  &__btn {
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
}
</style>
