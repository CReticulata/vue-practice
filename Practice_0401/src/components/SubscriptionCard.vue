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
</script>

<template>
  <div :class="isRecommended ? 'subscription-card--recommended' : 'subscription-card'">
    <div v-if="isRecommended" class="recommendation">推薦</div>
    <div class="header">
      <div class="header__title">個股報告</div>
      <div class="header__period">{{ periodString }}</div>
    </div>
    <div class="text-content">
      <div class="text-content__headline">
        <div class="headline__title">{{ periodString }}訂閱</div>
        <div class="headline__prices">
          <div class="price--price">{{ priceString }}</div>
          <div class="price--original">{{ originalPriceString }}</div>
        </div>
      </div>
      <div class="text-content__additional">
        <div v-if="isRecommended" class="additional__icon">
          <img src="@/assets/icon.svg" alt="crown icon" />
        </div>
        <div v-if="discount" class="additional--discount">額外再享{{ Number(discount) }}折</div>
        <div class="additional--monthly">單月 {{ monthlyPriceString }}</div>
      </div>
      <div class="text-content__actions">
        <button v-if="subscriptionStatus === 'reviewing'" class="actions--reviewing" disabled>
          已訂閱 待審中
        </button>
        <button v-else class="actions--unsubscribed">訂閱</button>
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
  height: 376px;
  border-radius: 12px;
  border: 1px solid #c2c7cf;

  &--recommended {
    @extend .subscription-card;
    height: 404px;
    border: 1px solid #c58000;

    background: linear-gradient(to bottom, #c58000 6.9%, transparent 6.9% 100%);

    .price--price {
      color: #c58000;
    }

    .additional {
      color: #c58000;
    }

    .actions {
      background-color: #c58000;
    }
  }
}

.header {
  height: 72px;
  padding: 12px 4px 12px 16px;
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

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  height: 304px;

  &__headline {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__additional {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__actions {
    width: 100%;
  }
}

.headline {
  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.5px;
    color: #1a1c1e;
  }

  &__prices {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }
}

.price {
  font-family: 'Noto Serif TC';
  font-weight: 700;

  &--price {
    @extend .price;
    font-size: 36px;
    line-height: 44px;
    color: #0062a0;
  }

  &--original {
    @extend .price;
    font-size: 24px;
    line-height: 32px;
    text-decoration: line-through;
    color: #42474e;
  }
}

.additional {
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.5px;

  &--discount {
    @extend .additional;
    font-weight: 500;
  }

  &--monthly {
    @extend .additional;
    font-weight: 700;
  }

  &__icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
  }
}

.actions {
  border-radius: 10px;
  height: 44px;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;

  &--reviewing {
    @extend .actions;
    border: 1px solid #1d1b201f;
    background-color: transparent;
    color: #cc5906;
  }

  &--unsubscribed {
    @extend .actions;
    border: none;
    background-color: #0062a0;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
