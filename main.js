import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      twd: 1000,
      tempJpy: 0,
      tempUsd: 0,
      isDisabled: true,
      isJpySetting: false,
      isUsdSetting: false,
    };
  },
  methods: {
    getExchangeRate(currency) {
      let rate = 1;
      switch (currency) {
        case "jpy":
          rate = 0.22;
          break;
        case "usd":
          rate = 31.5;
          break;
      }
      return rate;
    },
  },
  computed: {
    jpy: {
      get() {
        let result;
        if (this.isJpySetting) {
          result = this.tempJpy;
        } else {
          result = Number(
            Number(this.twd) / this.getExchangeRate("jpy")
          ).toFixed(2);
        }

        this.isJpySetting = false;
        return result;
      },
      set(value) {
        this.isJpySetting = true;
        this.tempJpy = value;
        this.twd = Number(Number(value) * this.getExchangeRate("jpy")).toFixed(
          2
        );
      },
    },
    usd: {
      get() {
        let result;
        if (this.isUsdSetting) {
          result = this.tempUsd;
        } else {
          result = Number(
            Number(this.twd) / this.getExchangeRate("usd")
          ).toFixed(2);
        }
        return result;
      },
      set(value) {
        this.isUsdSetting = true;
        this.tempUsd = value;
        this.twd = Number(Number(value) * this.getExchangeRate("usd")).toFixed(
          2
        );
      },
    },
  },
  mounted() {
    console.log("呀哈");
  },
}).mount("#app");
