<script setup lang="ts">
import { ref, Ref } from 'vue';
import { getFirestore, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { useRoute } from 'vue-router';

const route = useRoute();

const movieTitle = ref('Test Movie');
const movieDirector = ref('Test Director');
const movieImg = ref('/tmU7GeKVybMWFButWEGl2M4GeiP.jpg');
const overview = ref('This is an overview example for a test movie that is not real');
const rating = ref('9.9');

const db = getFirestore();

// const movieDoc = doc(db, "movies", <string> route.params.id);
//     getDoc(movieDoc).then(
//             (qd:DocumentSnapshot) => {
//                 movieTitle.value = ref(qd.get("title"));
//                 movieImg.value = ref(qd.get("poster_path"));
//                 overview.value = ref(qd.get("overview"));
//                 rating.value = ref(qd.get("vote_average"));
//             }
//         )

const reviews = ref([
  {
    id: 1,
    username: 'user1',
    review: 'This movie was amazing!'
  },
  {
    id: 2,
    username: 'user2',
    review: 'One of the best movies I\'ve ever seen!'
  },
  {
    id: 3,
    username: 'user3',
    review: 'I didn\'t really like this movie, but it had some good moments.'
  }
]);

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
            <h3 class="director">Director: {{ movieDirector }}</h3>
            <p>{{ overview }}</p>
            <h3>Average Rating: {{ rating }}/10</h3>
          </div>
        </div>
      </div>
      <div class="reviews-section">
        <h2>Reviews</h2>
        <div v-for="review in reviews" :key="review.id" class="review">
          <h3>{{ review.username }}</h3>
          <p>{{ review.review }}</p>
          <hr>
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
</style>
