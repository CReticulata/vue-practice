<script setup>
import { computed } from 'vue'

const props = defineProps({
  periodString: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  monthlyPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: null,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  subscriptionStatus: {
    type: String,
    required: true,
    validator(value) {
      return ['reviewing', 'unsubscribed'].includes(value)
    },
  },
})

const priceString = computed(() => `$${props.price.toLocaleString()}`)
const originalPriceString = computed(() => `$${props.originalPrice.toLocaleString()}`)
const monthlyPriceString = computed(() => `${props.monthlyPrice.toLocaleString()}`)
const btnClass = computed(() => `btn--${props.subscriptionStatus}`)
const btnString = computed(() => {
  if (props.subscriptionStatus === 'reviewing') {
    return '已訂閱 待審中'
  }

  return '訂閱'
})

const emits = defineEmits(['subscribe'])

function onClick() {
  if (props.subscriptionStatus === 'reviewing') {
    return
  }

  return emits('subscribe')
}
</script>

<template>
  <div :class="isRecommended ? 'subscription-card--recommended' : 'subscription-card'">
    <div v-if="isRecommended" class="recommendation">推薦</div>
    <div class="subscription-card__header">
      <div class="header">
        <div class="header__title">個股報告</div>
        <div class="header__period">{{ periodString }}</div>
      </div>
    </div>
    <div class="subscription-card__body">
      <div class="body">
        <div class="headline">
          <div class="headline__title">{{ periodString }}訂閱</div>
          <div class="headline__price">
            <div :class="isRecommended ? 'price--recommended' : 'price'">{{ priceString }}</div>
            <div class="price--original">{{ originalPriceString }}</div>
          </div>
        </div>

        <div :class="isRecommended ? 'additional--recommended' : 'additional'">
          <div v-if="isRecommended" class="additional__icon">
            <img src="@/assets/icon.svg" alt="crown icon" />
          </div>
          <div v-if="discount" class="additional__text">額外再享{{ Number(discount) }}折</div>
          <div class="additional__text--bold">單月 {{ monthlyPriceString }}</div>
        </div>

        <button :class="[btnClass, isRecommended ? 'btn--recommended' : '']" @click="onClick">
          {{ btnString }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recommendation {
  width: 360px;
  height: 28px;

  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #ffffff;
  text-align: center;
}

.subscription-card {
  width: 360px;
  border-radius: 12px;
  border: 1px solid #c2c7cf;

  &--recommended {
    @extend .subscription-card;
    border: 1px solid #c58000;

    background: linear-gradient(to bottom, #c58000 28px, transparent 28px 100%);
  }

  &__header {
    height: 72px;
    padding: 12px 4px 12px 16px;
  }

  &__body {
    padding: 16px;
  }
}

.header {
  display: flex;
  gap: 8px;
  align-items: center;

  &__title {
    font-weight: 500;
    font-size: 32px;
    line-height: 35px;
    letter-spacing: 0.5px;
    color: #1a1c1e;
  }

  &__period {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #526070;

    font-weight: 500;
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0.5px;
    color: #f9f9fc;
    text-align: center;
  }
}

.body {
  display: flex;
  flex-direction: column;
  gap: 54px;

  &__actions {
    width: 100%;
  }
}

.headline {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.5px;
    color: #1a1c1e;
  }

  &__price {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }
}

.price {
  font-family: 'Noto Serif TC';
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #0062a0;

  &--original {
    @extend .price;
    font-size: 24px;
    line-height: 32px;
    text-decoration: line-through;
    color: #42474e;
  }

  &--recommended {
    @extend .price;
    color: #c58000;
  }
}

.additional {
  display: flex;
  gap: 8px;
  align-items: center;

  &--recommended {
    @extend .additional;
    color: #c58000;
  }

  &__icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
  }

  &__text {
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.5px;
    font-weight: 500;

    &--bold {
      @extend .additional__text;
      font-weight: 700;
    }
  }
}

.btn {
  border-radius: 10px;
  height: 44px;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;

  &--unsubscribed {
    @extend .btn;
    border: none;
    background-color: #0062a0;
    color: #ffffff;
    cursor: pointer;
  }

  &--reviewing {
    @extend .btn;
    border: 1px solid #1d1b201f;
    background-color: transparent;
    color: #cc5906;
  }

  &--recommended {
    background-color: #c58000;
  }
}
</style>
