import { collection, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const createUser = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
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



