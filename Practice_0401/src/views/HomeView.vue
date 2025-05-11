<script setup>
import { ref, computed } from 'vue'
import SubscriptionCard from '@/components/SubscriptionCard.vue'
import SegmentedBtns from '@/components/SegmentedBtns.vue'

const subcriptionCards = ref([
  {
    periodString: '月',
    price: 3000,
    originalPrice: 6000,
    monthlyPrice: 3000,
    isRecommended: false,
    subscriptionStatus: 'reviewing',
  },
  {
    periodString: '季',
    price: 8550,
    originalPrice: 18000,
    monthlyPrice: 2850,
    discount: 95,
    isRecommended: false,
    subscriptionStatus: 'unsubscribed',
  },
  {
    periodString: '年',
    price: 32400,
    originalPrice: 72000,
    monthlyPrice: 2700,
    discount: 9,
    isRecommended: true,
    subscriptionStatus: 'unsubscribed',
  },
])

const segmentedBtn = ref('currentMonth')

const segmentedBtns = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth() + 1

  return [
    {
      name: 'currentMonth',
      label: `${currentMonth} 月 (當前月)`,
    },
    {
      name: 'lastMonth',
      label: `${currentMonth - 1} 月 (上個月)`,
    },
    {
      name: 'lastTwoMonth',
      label: `${currentMonth - 2} 月 (上上個月)`,
    },
  ]
})

function subscribe(index) {
  // do sth
  console.log(index)
}
</script>

<template>
  <div class="layout">
    <div class="subcription-cards">
      <SubscriptionCard
        v-for="(card, index) in subcriptionCards"
        :key="index"
        :periodString="card.periodString"
        :price="card.price"
        :originalPrice="card.originalPrice"
        :monthlyPrice="card.monthlyPrice"
        :discount="card.discount"
        :isRecommended="card.isRecommended"
        :subscriptionStatus="card.subscriptionStatus"
        @subscribe="() => subscribe(index)"
      ></SubscriptionCard>
    </div>
    <div class="segmented-btns">
      <SegmentedBtns v-model="segmentedBtn" :btns="segmentedBtns"></SegmentedBtns>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.subcription-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-end;
}

.segmented-btns {
  padding: 4px 0;
  width: 420px;
}
</style>
