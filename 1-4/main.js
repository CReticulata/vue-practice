import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      contact: "hi",
    };
  },
  // methods: {
  //   selectAll() {
  //     if (this.contact.length === 4) {
  //       this.contact = [];
  //     } else {
  //       this.contact = ["email", "phone", "line", "all"];
  //     }
  //   },
  // },
}).mount("#app");
