const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItems(id) {
      //   if (this.cart.some((item) => item === id)) {
      const indexOfItem = this.cart.indexOf(id);
      if (indexOfItem > -1) {
        this.cart.splice(indexOfItem, 1);
      }
    },
  },
});
