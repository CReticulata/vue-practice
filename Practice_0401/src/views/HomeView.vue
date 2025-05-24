<script setup>
import { ref } from 'vue'
import SubscriptionCard from '@/components/SubscriptionCard.vue'
import SegmentedBtns from '@/components/SegmentedBtns.vue'
import MyList from '@/components/MyList.vue'

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

const selectedMonth = ref('currentMonth')

const segmentedBtns = getSegmentedBtns()
// year
function getSegmentedBtns() {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  let lastMonth = currentMonth - 1
  let lastTwoMonth = currentMonth - 2
  if (lastMonth < 1) {
    lastMonth += 12
  }
  if (lastTwoMonth < 1) {
    lastTwoMonth += 12
  }

  return [
    {
      name: 'currentMonth',
      label: `${currentMonth} 月 (當前月)`,
    },
    {
      name: 'lastMonth',
      label: `${lastMonth} 月 (上個月)`,
    },
    {
      name: 'lastTwoMonth',
      label: `${lastTwoMonth} 月 (上上個月)`,
    },
  ]
}

function subscribe(index) {
  // do sth
  console.log(index)
}

const users = [
  { id: 1, name: '張三', email: 'zhangsan@example.com', age: 30 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 25 },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 35 },
]

const products = [
  { id: 101, name: '筆記型電腦', price: 1200, stock: 50 },
  { id: 102, name: '無線滑鼠', price: 25, stock: 200 },
  { id: 103, name: '機械鍵盤', price: 80, stock: 100 },
]
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
    <div class="layout__segmented-btns">
      <SegmentedBtns v-model="selectedMonth" :btns="segmentedBtns"></SegmentedBtns>
    </div>

    <MyList :items="users" title="用戶列表">
      <template v-slot:item="slotProps">
        <div class="user-card">
          <h3>{{ slotProps.item.name }}</h3>
          <p>Email: {{ slotProps.item.email }}</p>
          <p>Age: {{ slotProps.item.age }}</p>
        </div>
      </template>
    </MyList>
    <hr />

    <MyList :items="products" title="產品列表">
      <template v-slot:item="{ item }">
        <div class="product-item">
          <h4>{{ item.name }}</h4>
          <p>價格: ${{ item.price }}</p>
          <p>庫存: {{ item.stock }}</p>
        </div>
      </template>
    </MyList>

    <hr />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__segmented-btns {
    padding: 4px 0;
    width: 420px;
  }
}

.subcription-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-end;
}

.user-card {
  background-color: #f0f8ff;
  border-left: 5px solid #41b883;
  padding: 10px;
  text-align: left;
}

.product-item {
  background-color: #fff8e1;
  border-left: 5px solid #ffc107;
  padding: 10px;
  text-align: left;
}
</style>
