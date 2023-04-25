<script setup lang="ts">
import { ref, watch } from 'vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router';
import { getAuth } from 'firebase/auth';

const route = useRoute();
const auth = getAuth();

type Review = {
  id: number;
  username: string;
  review: string;
}

const movieTitle = ref('');
const movieImg = ref('');
const overview = ref('');
const rating = ref('');
const reviews = ref<Review[]>([]);
const editing = ref(false);
const editReviewId = ref<number | null>(null);

const db = getFirestore();

const movieDoc = doc(db, "movies", <string>route.params.id);
getDoc(movieDoc).then((qd) => {
  movieTitle.value = qd.get("title");
  movieImg.value = qd.get("poster_path");
  overview.value = qd.get("overview");
  rating.value = qd.get("vote_average");
  if (qd.get("reviews")) {
    reviews.value = qd.get("reviews");
  }
});

const user = auth.currentUser;

const newReview = ref<Review>({
  id: 0,
  username: '',
  review: ''
});

const submitReview = async () => {
  if (user) {
    const docRef = doc(db, "movies", <string>route.params.id);
    if (editing.value && editReviewId.value !== null) {
      const updatedReviews = reviews.value.map(review => {
        if (review.id === editReviewId.value) {
          return { ...review, review: newReview.value.review };
        } else {
          return review;
        }
      });
      await updateDoc(docRef, {
        reviews: updatedReviews
      });
      reviews.value = updatedReviews;
      editing.value = false;
      editReviewId.value = null;
    } else {
      const newReviewDoc = {
        id: reviews.value.length + 1,
        username: `${user.email}`,
        review: newReview.value.review
      };
      await updateDoc(docRef, {
        reviews: [...reviews.value, newReviewDoc]
      });
      reviews.value.push(newReviewDoc);
    }
    newReview.value.review = '';
  }
};

const deleteReview = async (id: number) => {
  const docRef = doc(db, "movies", <string>route.params.id);
  const updatedReviews = reviews.value.filter(review => review.id !== id);
  await updateDoc(docRef, {
    reviews: updatedReviews
  });
  reviews.value = updatedReviews;
};

const editReview = async (id: number, newReviewText: string) => {
  editing.value = true;
  editReviewId.value = id;
  newReview.value.review = newReviewText;
};

watch(editing, (newVal) => {
  if (newVal === false) {
    newReview.value.review = '';
  }
});

</script>


<template>
  <div class="page-wrapper">
    <div class="hero">
      <div class="movie-details">
        <div class="movie-poster">
          <img :src='"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movieImg'>
        </div>
        <div class="movie-info">
          <h1 class="movie-title">{{ movieTitle }}</h1>
          <hr class="divider">
          <div class="movie-description">
            <p>{{ overview }}</p>
            <h3>Average Rating: {{ rating }}/10</h3>
          </div>
        </div>
      </div>
      <div class="reviews-section">
        <h2>Reviews</h2>
        <div v-for="review in reviews" :key="review.id" class="review">
          <h3>{{ review.username }}</h3>
          <div v-if="!editing || (editing && editReviewId !== review.id)">
            <p>{{ review.review }}</p>
            <div v-if="user && user.email === review.username">
              <button @click="deleteReview(review.id)" class="btn btn-danger">Delete</button>
              <button @click="editReview(review.id, review.review)" class="btn btn-primary">Edit</button>
            </div>
          </div>
          <div v-if="editing && editReviewId === review.id">
            <form @submit.prevent="submitReview">
              <div class="form-group">
                <label for="review-text">Review</label>
                <textarea class="form-control" id="review-text" v-model="newReview.review" required></textarea>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">{{ editReviewId ? 'Update' : 'Post' }} Review</button>
              </div>
            </form>
          </div>
          <hr>
        </div>
        <div v-if="user" class="add-review">
          <h2>Add a Review</h2>
          <form @submit.prevent="submitReview">
            <div class="form-group">
              <label for="review-text">Review</label>
              <textarea class="form-control" id="review-text" v-model="newReview.review" required></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">{{ editReviewId ? 'Update' : 'Post' }} Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: #8b8b8b;
  display: flex;
  justify-content: center;
  color: black;
}

.hero {
  width: 90%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-details {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}

.movie-poster {
  margin-right: 30px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 15px #00000030;
}

.movie-poster img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.movie-info {
  flex: 1;
}

.movie-info h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.movie-info h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.movie-info-line {
  width: 50px;
  height: 3px;
  background-color: #FFB800;
  margin-bottom: 20px;
}

.movie-overview {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.reviews-section {
  margin-top: 50px;
}

.review {
  margin-bottom: 30px;
}

.review h3 {
  margin-bottom: 10px;
}

.review p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
}

.add-review {
  margin-top: 20px;
}

.add-review h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 18px;
}

button {
  padding: 10px 20px;
  background-color: #FFB800;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #ffc72c;
}

</style>
