<script setup>
import { ref } from 'vue'
import SubscriptionCard from '@/components/SubscriptionCard.vue'

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

function subscribe(index) {
  // do sth
  console.log(index)
}
</script>

<template>
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
</template>

<style scoped lang="scss">
.subcription-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-end;
}
</style>
