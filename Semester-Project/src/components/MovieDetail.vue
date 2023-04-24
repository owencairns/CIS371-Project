<script setup lang="ts">
import { ref, Ref } from 'vue';
import { getFirestore, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { useRoute } from 'vue-router';

const route = useRoute();

const movieTitle = ref('');
const movieImg = ref('');
const overview = ref('');
const rating = ref('');

const db = getFirestore();

const movieDoc = doc(db, "movies", <string> route.params.id);
    getDoc(movieDoc).then(
            (qd:DocumentSnapshot) => {
                movieTitle.value = ref(qd.get("title"));
                movieImg.value = ref(qd.get("poster_path"));
                overview.value = ref(qd.get("overview"));
                rating.value = ref(qd.get("vote_average"));
            }
        )
</script>

<template>
  <div class = "hero">
        <h1>This is the movie detail page</h1>
        <h1>Movie ID: {{ $route.params.id }}</h1>
        <h1>Movie Title: {{ movieTitle }}</h1>
        <img :src = '"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movieImg'>
        <h1>Movie Overview: {{ overview }}</h1>
        <h1>Average Rating: {{ rating }}</h1>
    </div>
</template>

<style scoped>
.hero {
  width: 90%;
  height: 100vh;
  background-image: linear-gradient(#00000030, #00000030);
  position: relative;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
