import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  computed: {
    subtotalComputed: function () {
      console.log("computed");
      return 100 * 100;
    },
  },
  methods: {
    subtotalMethods() {
      console.log("methods");
      return 100 * 100;
    },
  },
}).mount("#test1");

vm.$data.message = "Hey";
