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
const auth = firebase.getAuth();
// const provider = new firebase.auth.GoogleAuthProvider();


async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function signInWithGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function signOut() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}
