

function initializeFirebaseApp() {
    const firebaseConfig = {
      apiKey: "AIzaSyCYLksm53UhnYCxI77-hNoZl_apDlWoz7k",
      authDomain: "birds-of-a-feather-f7414.firebaseapp.com",
      projectId: "birds-of-a-feather-f7414",
      storageBucket: "birds-of-a-feather-f7414.firebasestorage.app",
      messagingSenderId: "514624258311",
      appId: "1:514624258311:web:18d517b54cf1eec93805a2"
    };
  
    firebase.initializeApp(firebaseConfig);
  }
  

const app = initializeFirebaseApp();
const db = firebase.firestore();
manageLoginState();

async function manageLoginState() {
    // Authentication
    const auth = firebase.auth();
    console.log("auth: ", auth);
    await firebase.auth().onAuthStateChanged(async (user) => {
        console.log(user);
        if (user !== null) {
            user = await managePermissionState(user);
            document.getElementById("namebox").textContent = await "Hello " + user.name;
            document.getElementById("sidebtn").textContent = "Logout ";
            document.getElementById("sidebtn").href = "/";
            document.getElementById("sidebtn2").textContent = "My Preferences";
            
            document.getElementById("sidebtn").addEventListener("click", async (evt) => {
                console.log("button pushed");
                await auth.signOut().then(
                    () => {
                        console.log("signed out");
                    }
                );
            });
        } else {
            // User is signed out
            console.log("user not signed-in");
            document.getElementById("sidebtn").textContent = "Login";
            document.getElementById("sidebtn").href = "/login/login.html";
        }
    });
}

async function managePermissionState(user) {
    // Permissions
    const querySnapshot = await db.collection("users").where("id", "==", user.uid).get();
    const docSnap = querySnapshot.docs.map(doc => doc.data())[0];
    console.log(docSnap.accessLevel);
    return docSnap;
}
