const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      brand: "Vue Mastery",
      //   image: "./assets/images/socks_blue.jpg",
      currentVariant: 0,
      //   inStock: false,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateImage(variantImage) {
      this.image = variantImage;
    },
    updateVariant(index) {
      this.currentVariant = index;
    },
  },
  computed: {
    title() {
      if (this.onSale) {
        return this.brand + " " + this.product + " is on sale";
      }

      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.currentVariant].image;
    },
    inStock() {
      if (this.variants[this.currentVariant].quantity === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
});
