<script setup lang="ts">
import { ref, Ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { debug } from 'console';
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const router = useRouter()

const db = getFirestore();

const username = ref('')
const password = ref('')

const firstName = ref('')
const lastName = ref('')

const signUp = () => {
  createUserWithEmailAndPassword(getAuth(), username.value, password.value)
    .then((data) => {
      // Create a document in the 'Users' collection with the same key as the user created in firebase auth
      const newUserRef = doc(db, "users", data.user.uid);
      setDoc(newUserRef, {email: username.value, fName: firstName.value, lName: lastName.value, phonNum: '' }); 
      console.log("Successfully Registered")
      router.push('/')
    })
    .catch((error) => {
      console.error(error.code)
    })
};

</script>

<template>
  <div class="center">
    <h1>Sign Up</h1>
    <div class="fields">
      <input type="text" placeholder="Email" name="userBox" v-model="username">
      <input type="text" placeholder="Password" name="passBox" v-model="password">
      <input type="text" placeholder="First Name" name="userBox" v-model="firstName">
      <input type="text" placeholder="Last Name" name="passBox" v-model="lastName">
    </div>
    <button class="login" @click="signUp">Sign Up</button>
  </div>
</template>

<style scoped>

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:400px;
  background: #242424;
  border: 2px solid lightgray;
  border-radius: 10px;
  color: #42b983;
  padding: 10px
}

.center h1 {
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid lightgray;
}

.fields {
  position: relative;
  border-bottom: 1px solid lightgray;
  margin: 30px 0px;
}

.fields input {
  width: 90%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  border: 2px solid lightgray;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px
}

.center .login {
  transform: translateY(-15px)
}


</style>