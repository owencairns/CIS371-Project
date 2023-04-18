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
  <div class="favorites">
    <h3>Some of Our Work</h3>
    <div class="vid1"></div>
    <div class="vid2"></div>
    <div class="vid3"></div>
    <div class="vid4"></div>
    <div class="vid5"></div>
    <div class="vid6"></div>
  </div>
  <section class="video-section">
    <h1>Trending Now</h1>
    <div class="video-grid">
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
    </div>
  </section>
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

.video-section {
  color: #000000;
  margin: 0 auto;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 100px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 30px;
}

.video-placeholder {
  height: 270px;
  background-color: gray;
  border-radius: 5px;
}

</style>