// import { collection, getFirestore } from "firebase/firestore";
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
  
    // initializeApp(firebaseConfig);
  }
  
const db = getFirestore();

export const createUser = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (error) {
        console.error(error);
    }
}

export const readUser = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (userId, user) => {
    try {
        await setDoc(doc(db, "users", userId), user);
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (userId) => {
    try {
        await deleteDoc(doc(db, "users", userId));
    } catch (error) {
        console.error(error);
    }
}



