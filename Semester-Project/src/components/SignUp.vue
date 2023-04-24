<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const router = useRouter()

const db = getFirestore();

const username = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMessage = ref('')

const signUp = () => {
  errorMessage.value = ''
  createUserWithEmailAndPassword(getAuth(), username.value, password.value)
    .then((data) => {
      // Create a document in the 'Users' collection with the same key as the user created in firebase auth
      const newUserRef = doc(db, "users", data.user.uid);
      setDoc(newUserRef, {email: username.value, fName: firstName.value, lName: lastName.value, phonNum: '' }); 
      console.log("Successfully Registered")
      router.push('/')
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
};
</script>

<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1>Sign Up</h1>
      <div class="signup-form">
        <div class="signup-input">
          <input type="text" placeholder="Email" v-model="username">
        </div>
        <div class="signup-input">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="signup-input">
          <input type="text" placeholder="First Name" v-model="firstName">
        </div>
        <div class="signup-input">
          <input type="text" placeholder="Last Name" v-model="lastName">
        </div>
        <button class="signup-button" @click="signUp">Sign Up</button>
      </div>
      <p class="signup-text">Already have an account? <router-link to="/login">Log in</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
  color: black;
}

.signup-card {
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 75px;
  text-align: center;
}

.signup-card h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
}

.signup-form {
  margin-bottom: 30px;
}

.signup-input {
  margin-bottom: 20px;
}

.signup-input input {
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  font-size: 1rem;
  color: #333333;
}

.signup-button {
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  border-radius: 5px;
  border: none;
  background-color: #FFB800;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.signup-button:hover {
  background-color: #FFB800;
}

.signup-text {
  font-size: 1rem;
  color: #666666;
}
</style>
