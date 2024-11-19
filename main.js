import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const el = document.createElement("div");
el.setAttribute("id", "child");
el.textContent = "{{ name }}已陣亡";
document.body.appendChild(el);

const vm = createApp({
  data() {
    return {
      name: "天兔",
    };
  },
  mounted() {
    console.log("呀哈");
  },
});

vm.mount(el);
