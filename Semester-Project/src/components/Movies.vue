<script setup lang="ts">
import { ref, Ref } from 'vue';
import { getFirestore, doc, getDoc, DocumentSnapshot, query, where, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

const db = getFirestore();
const moviesRef = collection(db, "movies");
//const movieName = ref("");

const search = ref("");
const movieImgs = ref(<string[]>[]);
const movieIDs = ref(<number[]>[]);
const movies = ref([]);

const SearchMovies = () => {
    if (search.value != "") {
        //console.log(search.value);
       //Remove existing items in grid

        const movieName = query(moviesRef, where("title", ">=", search.value), where("title", "<=", search.value + '\uf8ff'))

        getDocs(movieName).then(
            (qs:QuerySnapshot) => {
                qs.forEach((qd:QueryDocumentSnapshot) => {
                    const movie = qd.data();

                    //movies.value.push(movie)
                    movieIDs.value.push(movie.id);
                    movieImgs.value.push("https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path);
                })
            }
        )
        
        search.value = "";
}
}

</script>

<template>
  <h1>This is the movies page</h1>

  <form @submit.prevent="SearchMovies()" class="search-box">
    <input type="text" placeholder="Search for movie" v-model="search">
    <input type="submit" value="Search">
  </form>

  <div class = "movie-grid" id="grid">
    <div v-for="(image, index) in movieImgs" :key='index' class="movie-placeholder">
        <router-link :to="'/movie/' + movieIDs[index]"><img :src="image"></router-link>
    </div>
    <div class="movie-placeholder"></div>
    <div class="movie-placeholder"></div>
    <div class="movie-placeholder"></div>
    <div class="movie-placeholder"></div>
    <div class="movie-placeholder"></div>
    <div class="movie-placeholder"></div>
  </div>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 30px;
}

img {
    max-width: 100%;
    max-height: 100%;
}

.movie-placeholder {
  height: 270px;
  background-color: gray;
  border-radius: 5px;
}

.search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
</style>