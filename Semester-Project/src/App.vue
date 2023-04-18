<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar class="navbar"/>
  <div class="main">
    <router-view/>
  </div>
</template>

<style scoped>
.navbar {
  z-index: 10000;
}
</style>
