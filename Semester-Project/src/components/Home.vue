<script setup lang="ts">
import { ref, Ref } from 'vue';

</script>

<template>
  <div class="hero">
    <h1 class="title">REEL TALK</h1>
    <h2 class="slogan">Lights, Camera, Opinion</h2>
    <video autoplay loop muted playsinline class="back-vid">
      <source src="../assets/film_projector.mp4" type="video/webm"/>
    </video>
    <div class="content">
      <router-link to="/" class="book">Explore!</router-link>
    </div>
  </div>
</template>

<style scoped>

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
}

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

.title {
  text-transform: uppercase;
  font-size: 8rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
}

.slogan {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffe600;
  margin-top: 0;
  margin-bottom: 30px;
}

.content .book {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  font-size: 24px;
  border: 2px solid #fff;
  padding: 14px 70px;
  border-radius: 50px;
  margin-top: 100px;
}

.content .book:hover {
  background-color: #fff;
  color: #000000;
  transition: 0.3s ease-in-out;
}

.back-vid {
  position: absolute;
  filter: grayscale();
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>