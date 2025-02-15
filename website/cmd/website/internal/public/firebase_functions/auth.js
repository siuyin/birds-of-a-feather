// import { initializeApp } from "firebase/app";

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
// const auth = auth;
const provider = new firebase.auth.GoogleAuthProvider();


async function signUp() {
    try {
        var email = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
        console.log("Signed Up");
        return user;
    } catch (error) {
        console.error(error);
    }
}
async function signIn() {
    try {
        var email = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var name = document.getElementById("name").value;
        const userCredential = firebase.auth().signInWithEmailAndPassword(email, password);

        const user = userCredential.user;
        console.log(user);
        console.log("Signed In");
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function signInWithGoogle() {
    try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function signOut() {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.error(error);
    }
}
