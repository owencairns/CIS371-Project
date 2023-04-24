import { createApp } from "vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import "./style.css";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faBars)

import App from "./App.vue";
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import About from './components/About.vue'
import Profile from './components/Profile.vue'
import Movies from './components/Movies.vue'
import MovieDetail from './components/MovieDetail.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhFirswNyKdLfxgLwCE0vTTJa5JNE6NIs",
  authDomain: "cis371-project-f3a37.firebaseapp.com",
  projectId: "cis371-project-f3a37",
  storageBucket: "cis371-project-f3a37.appspot.com",
  messagingSenderId: "723012438906",
  appId: "1:723012438906:web:23a33f5887a1b11c81e4c3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const myComponentRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/about', component: About },
    { path: '/profile', component: Profile },
    { path: '/movies', component: Movies },
    { path: '/movie/:id', component: MovieDetail },
   ];
const router = createRouter({ routes: myComponentRoutes, history: createWebHashHistory() });

createApp(App).use(router).mount("#app");