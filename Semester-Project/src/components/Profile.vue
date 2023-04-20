<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { getFirestore, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const phoneNum = ref()

//onMounted(() => {
const db = getFirestore();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then(
            (qd:DocumentSnapshot) => {
                email.value = ref(qd.get("email"));
                firstName.value = ref(qd.get("fName"));
                lastName.value = ref(qd.get("lName"));
                phoneNum.value = ref(qd.get("phoneNum"));
            }
        )
    }
    else {
    }
})
//});

</script>

<template>
    <div class = "hero">
        <h1>This is the profile page</h1>
        <h2>Email: {{ email }}</h2>
        <h2>First Name: {{ firstName }}</h2>
        <h2>Last Name: {{ lastName }}</h2>
        <h2>Phone Number: {{ phoneNum }}</h2>
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