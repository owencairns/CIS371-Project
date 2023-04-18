<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar/>
  <div class="main">
    <router-view/>
  </div>
</template>

<style scoped>

</style>
