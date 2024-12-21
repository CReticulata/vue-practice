app.component("review-list", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="review-container">
        <h3>Reviews:</h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
            {{ review.name }} says "{{ review.review }}" and gives {{ review.rating }}-star rating.
                <span v-if="review.isRecommendation">👍<span>
            </li>
        </ul>
    </div>
        `,
});
