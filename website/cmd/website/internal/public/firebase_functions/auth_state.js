

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
    await firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user !== null) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            // var uid = user.uid;
            // document.getElementById("user").innerText = `userid: ${uid}, user email: ${user.providerData[0].email}, currentUser: ${auth.currentUser.uid}`;
            // document.getElementById('firebaseui-auth-container').style.display = "none";
            // document.getElementById('user').style.display = "block";
            // document.getElementById('sign-out').style.display = "block";
            document.getElementById("sidebtn").textContent = "Logout";
            managePermissionState(user);
            document.getElementById("sidebtn").href = "/";
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
            // ...
            console.log("user not signed-in");
            // document.getElementById('firebaseui-auth-container').style.display = "block";
            document.getElementById("sidebtn").textContent = "Login";
            document.getElementById("sidebtn").href = "/login/login.html";
            
        }
    });
}

async function managePermissionState(user) {
    // Permissions
    const querySnapshot = await db.collection("users").where("id", "==", user.uid).get();
    const docSnap = querySnapshot.docs.map(doc => doc.data().accessLevel)[0];
    console.log(docSnap);
}
