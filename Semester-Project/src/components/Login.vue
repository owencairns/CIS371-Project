<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const errMsg = ref() //ERROR MESSAGE

const login = () => {
  signInWithEmailAndPassword(getAuth(), username.value, password.value)
    .then(() => {
      console.log("Successfully Signed In")
      router.push('/')
    })
    .catch((error) => {
      console.log(error)
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-passwword":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    })
}
</script>

<template>
  <div class="login-overlay">
    <div class="login-container">
      <h1>Login</h1>
      <div class="login-form">
        <label for="email" :class="{ 'active': username }">Email</label>
        <input type="text" id="email" v-model="username">
        <label for="password" :class="{ 'active': password }">Password</label>
        <input type="password" id="password" v-model="password">
        <button class="login-button" @click="login">Login</button>
        <p v-if="errMsg">{{ errMsg }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #333;
  border-radius: 10px;
  color: white;
  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.login-container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #999;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

label.active {
  font-size: 12px;
  top: 0;
  transform: translateY(0%);
}

input {
  padding: 20px 10px;
  font-size: 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  margin-bottom: 30px;
  color: #fff;
}

input:focus + label {
  font-size: 12px;
  top: 0;
  transform: translateY(0%);
}

input:focus + label + .bar {
  width: 100%;
}

.bar {
  position: absolute;
  display: block;
  width: 0%;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease-in-out;
  bottom: 0;
  left: 0;
}

.login-button {
  padding: 10px 20px;
  background: #fff;
  border: none;
  border-radius: 5px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.login-button:hover {
  background: #333;
  color: #fff;
}

</style>
