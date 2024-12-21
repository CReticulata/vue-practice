app.component("review-form", {
  template:
    /*html*/
    `
        <form class="review-form" @submit.prevent="submitReview">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        
        <div class="radio-input">
            <p>Would you recommend this product?</p>
            <input type="radio" id="yes" value="yes" v-model="recommendation">
            <label for="yes">Yes</label>
            <input type="radio" id="no" value="no" v-model="recommendation">
            <label for="no">No</label>
        </div>      
        <input class="button" type="submit" value="Submit">
      </form>
        `,
  data() {
    return {
      name: "",
      review: "",
      rating: null,
      recommendation: "yes",
    };
  },
  methods: {
    submitReview() {
      if (this.name === "" || this.review === "" || this.rating === null) {
        return;
      }
      const productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        isRecommendation: this.isRecommendation,
      };

      this.$emit("review-submitted", productReview);

      this.name = "";
      this.review = "";
      this.rating = null;
    },
  },
  computed: {
    isRecommendation() {
      if (this.recommendation === "yes") {
        return true;
      } else {
        return false;
      }
    },
  },
});
