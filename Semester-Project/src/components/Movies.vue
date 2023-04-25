<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, orderBy, limit, doc, getDoc, DocumentSnapshot, query, where, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'
import { sampleSize } from "lodash";

const db = getFirestore();
const moviesRef = collection(db, "movies");
//const movieName = ref("");

const search = ref("");
const movieImgs = ref<string[]>([]);
const movieTitles = ref<string[]>([]);
const movieIDs = ref<number[]>([]);
const movieCache: Record<number, any> = {};

const searchMovies = () => {
  if (search.value !== "") {
    const movieName = query(
      moviesRef,
      where("title", ">=", search.value),
      where("title", "<=", search.value + "\uf8ff")
    );

    getDocs(movieName).then((qs: QuerySnapshot) => {
      movieImgs.value = [];
      movieIDs.value = [];
      movieTitles.value = [];
      qs.forEach((qd: QueryDocumentSnapshot) => {
        const movie = qd.data();
        movieCache[movie.id] = movie;
        movieIDs.value.push(movie.id);
        movieImgs.value.push(
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
        );
        movieTitles.value.push(movie.title);
      });
    });
    search.value = "";
  }
};

onMounted(async () => {
  const snapshot = await query(
    moviesRef,
    orderBy("id"),
    limit(20)
  );
  const docs = await getDocs(snapshot);
  const movies = sampleSize(docs.docs.map(doc => doc.data()), 100);
  movies.forEach(movie => {
    movieCache[movie.id] = movie;
    movieIDs.value.push(movie.id);
    movieImgs.value.push(
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
    );
    movieTitles.value.push(movie.title);
  });
});

</script>

<template>
  <div class="navbg"></div>
  <div class="search-input-container">
    <input type="text" placeholder="Enter a movie title" v-model="search" id="search-input" class="search-input">
    <button type="submit" class="search-button" @click.prevent="searchMovies">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>

  <div class="movie-grid">
    <div v-for="(image, index) in movieImgs" :key="index" class="movie-card">
      <router-link :to="'/movie/' + movieIDs[index]">
        <img :src="image" class="movie-image">
        <div class="movie-title">{{ movieTitles[index] }}</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.navbg {
  position: relative;
  top: 0;
  left: 0;
  background-color: black;
  width: 100%;
  height: 100px;
}
.search-input-container {
  padding-top: 10px;
  width: 20%;
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #f2f2f2;
  padding-left: 5%;
  padding: 10px 20px;
}

.search-input {
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  background-color: transparent;
  width: 100%;
  color: #333;
}

.search-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
}

.search-button svg {
  width: 24px;
  height: 24px;
  stroke-width: 1.5;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 30px;
}

.movie-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.movie-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

.movie-title {
  padding: 16px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.search-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
</style>