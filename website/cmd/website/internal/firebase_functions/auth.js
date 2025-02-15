const app = initializeFirebaseApp();
const auth = getAuth(app);
const provider = new firebase.auth.GoogleAuthProvider();


export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const signOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}

