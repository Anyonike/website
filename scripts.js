script type="module">
  // Import Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC6zeOYfLSiMPserV72s3ojOgYog_R-yRw",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Fetch Data from Firestore
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach(doc => {
      document.body.innerHTML += `<p>${doc.data().name}: ${doc.data().score}</p>`;
    });
  }

  fetchData();

  // Add Data to Firestore
  async function addData() {
    await addDoc(collection(db, "students"), {
      name: "John Doe",
      score: 85
    });
    alert("Data Added!");
  }
</script>

<button onclick="addData()">Add Student</button>

