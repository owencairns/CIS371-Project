<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { routerKey, useRouter } from 'vue-router';

const router = useRouter();

let mobile = false
let scroll = ref(false)

window.addEventListener('scroll', function() {
    if (this.window.scrollY > 0) {
        scroll.value = true
    }
    else {
        scroll.value = false
    }
})

// Stuff used to find out if a user is logged in or not
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        }
        else {
            isLoggedIn.value = false;
        }
    });
});

// Signs the user out then returns them to the home page
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/");
    });
};

</script>

<template>
  <header :class="{ sticky: scroll }">
    <nav>
        <div class="branding">
            <router-link to="/" class="logo"><img src="../assets/film-movie-reel-icon-white.png" /></router-link>
        </div>
        <ul v-show="!mobile" class="navigation">
            <li><router-link to="/" class="link">Home</router-link></li>
            <li><router-link to="/movies" class="link">Movies</router-link></li>
            <li><router-link to="/login" class="link" v-if="!isLoggedIn">Login</router-link></li>
            <li><router-link to="/signup" class="link" v-if="!isLoggedIn">Sign Up</router-link></li>
            <li><router-link to="/profile" class="link" v-if="isLoggedIn">Profile</router-link></li>
            <li><button @click="handleSignOut" class="button" v-if="isLoggedIn">Sign Out</button></li>
        </ul>
    </nav>
  </header>
</template>
 
<style scoped>

body {
    font-weight: 500;
    font-size: large;
}

header {
    background-color: transparent;
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    top: 0;
    left: 0;
}

nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 0 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
}

header.sticky {
    background-color: #000000;
}
header.sticky .link {
    color: #ffe600;
    font-weight: 400;
    font-size: 13px;
    padding-bottom: 4px;
}

header.sticky .branding .logo img {
    height: 45px;
    color: white;
}

ul,
.link {
    font-weight: 600;
    color: #ffe600;
    list-style: none;
    text-decoration: none;
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
    
}

li {
    text-transform: uppercase;
    padding: 8px;
    margin-left: 16px;
}

.link:hover {
    color: #fff;
    border-color: #fff;
}

.branding {
    display: flex;
    align-items: center;
}

.branding .logo img {
    height: 65px;
    padding-top: 5px;
    width: auto;
    transition: 0.5s ease all;
}

.navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.button {
    font-weight: 600;
  text-decoration: none;
  display: inline-block;
  color: #ffe600;
  font-size: 14px;
  border: 2px solid #fff;
  border-radius: 50px;
  transition: 0.5s ease all;
  
}

.button:hover {
  background-color: #fff;
  color: #000000;
  transition: 0.3s ease-in-out;
}

</style>
