const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      image: "./assets/images/socks_blue.jpg",
      inStock: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        { id: 2234, color: "green", image: "./assets/images/socks_green.jpg" },
        { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg" },
      ],
    };
  },
  methods: {
    updateImage(variantImage) {
      this.image = variantImage;
    },
    addToCart(event) {
      this.cart++;
      console.log(event.type);
    },
    removeFromCart() {
      if (this.cart >= 1) this.cart--;
    },
    parentSay() {
      console.log("父元素！");
    },
    childSay() {
      console.log("子元素！");
    },
    saySomething() {
      console.log("這是怎樣");
    },
  },
});
