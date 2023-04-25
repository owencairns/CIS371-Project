<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getFirestore, doc, getDoc, DocumentSnapshot, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Chart, ChartConfiguration } from 'chart.js/auto';

type Review = {
  id: number;
  username: string;
  review: string;
}

type User = {
  email: string;
  totalReviews: number;
}

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const reviews = ref<Review[]>([]);
const users = ref<User[]>([]);

const db = getFirestore();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userDoc = doc(db, "users", user.uid);
    getDoc(userDoc).then((qd: DocumentSnapshot) => {
      email.value = qd.get("email");
      firstName.value = qd.get("fName");
      lastName.value = qd.get("lName");
      if (qd.get("reviews")) {
        reviews.value = qd.get("reviews");
      }
    });

    // Query top 10 users by totalReviews
    const usersCollection = collection(db, 'users');
    const usersQuery = query(usersCollection, orderBy('totalReviews', 'desc'), limit(10));
    getDocs(usersQuery).then((qs) => {
      users.value = qs.docs.map((doc) => ({ email: doc.get("email"), totalReviews: doc.get("totalReviews") }));
      createChart();
    });
  }
});

function createChart() {
  const chartElement = document.getElementById('myChart') as HTMLCanvasElement;

  const chartConfig: ChartConfiguration<'bar', number[], string> = {
    type: 'bar',
    data: {
      labels: users.value.map((user) => user.email),
      datasets: [{
        label: 'Total Reviews',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: users.value.map((user) => user.totalReviews),
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Top Users by Total Reviews',
          font: {
            size: 24,
            weight: 'bold',
            family: 'Arial, sans-serif',
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Arial, sans-serif',
              size: 14,
            },
          },
        },
        x: {
          ticks: {
            font: {
              family: 'Arial, sans-serif',
              size: 14,
            },
          },
        },
      },
    },
    
  };
  new Chart(chartElement, chartConfig);
}

</script>

<template>
  <div class="page-wrapper">
    <div class="hero">
      <div class="movie-details">
        <div class="movie-info">
          <h1 class="movie-title">{{ firstName }} {{ lastName }}</h1>
          <hr class="divider">
          <div class="movie-description">
            <h3>Email: {{ email }}</h3>
          </div>
        </div>
      </div>
      <div class="reviews-section">
        <h2>My Reviews</h2>
        <div v-for="review in reviews" :key="review.id" class="review">
          <h3>{{ review.username }}</h3>
          <p>{{ review.review }}</p>
          <hr>
        </div>
      </div>
      <div class="chart-section">
        <div>
          <h1>Top Users by Total Reviews</h1>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.page-wrapper {
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: #8b8b8b;
  display: flex;
  justify-content: center;
  color: black;
}

.hero {
  width: 90%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-details {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}

.movie-poster {
  margin-right: 30px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 15px #00000030;
}

.movie-poster img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.movie-info {
  flex: 1;
}

.movie-info h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.movie-info h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.movie-info-line {
  width: 50px;
  height: 3px;
  background-color: #FFB800;
  margin-bottom: 20px;
}

.movie-overview {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.reviews-section {
  margin-top: 50px;
}

.review {
  margin-bottom: 30px;
}

.review h3 {
  margin-bottom: 10px;
}

.review p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
}

.add-review {
  margin-top: 20px;
}

.add-review h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 18px;
}

button {
  padding: 10px 20px;
  background-color: #FFB800;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #ffc72c;
}

.chart-section {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #00000030;
  padding: 20px;
}

#myChart {
  margin-top: 20px;
}

</style>