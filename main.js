import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      twd: 1000,
    };
  },
  methods: {
    getExchangeRate(currency) {
      let rate = 1;
      switch (currency) {
        case "jpy":
          rate = 0.22;
          break;
      }
      return rate;
    },
  },
  computed: {
    jpy: {
      get() {
        // console.dir(this);
        return Number(Number(this.twd) / this.getExchangeRate("jpy")).toFixed(
          2
        );
      },
      set(value) {
        this.twd = Number(Number(value) * this.getExchangeRate("jpy")).toFixed(
          2
        );
      },
    },
  },
  mounted() {
    console.log("呀哈");
  },
}).mount("#app");
