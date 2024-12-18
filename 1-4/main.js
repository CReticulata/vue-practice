import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const vm = createApp({
  data() {
    return {
      contact: "hi",
      selected: "請選擇",
      rawContent: "<h1>Happy happy happy</h1>",
      title: "",
      fontSize: "30px",
    };
  },
  computed: {
    isError: function () {
      return this.title.length > 10;
    },
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
