import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      twd: 1000,
      message: "沒事就想講講話",
    };
  },
  methods: {
    getExchangeRate(currency) {
      let rate = 1;
      switch (currency) {
        case "jpy":
          rate = 0.22;
          break;

        default:
          break;
      }
      return rate;
    },
  },
  computed: {
    jpy: {
      get() {
        console.dir(this);
        return Number(this.twd) / getExchangeRate("jpy");
      },
      set(value) {
        this.twd = Number(value) * getExchangeRate("jpy");
      },
    },
  },
  mounted() {
    console.log("呀哈");
  },
}).mount("#app");
