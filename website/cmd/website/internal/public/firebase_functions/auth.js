const AccessLevel = Object.freeze({
    PUBLIC: 'public',
    RESTRICTED: 'restricted',
});

const UserType = Object.freeze({
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin',
    EVENTS: 'events',
    LOGISTICS: 'logistics'
});

class User {
    constructor(id, name, email, userType, accessLevel) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.userType = userType;
        this.accessLevel = accessLevel;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            userType: this.userType,
            accessLevel: this.accessLevel
        };
    }

    static fromJSON(json) {
        return new User(json.id, json.name, json.email, json.userType, json.accessLevel);
    }

}

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
const db = firebase.firestore();


async function createUser(id, name, email, userType, accessLevel) {
    try {
        var userObj = {
            id: id,
            name: name,
            email: email,
            userType: userType,
            accessLevel: accessLevel
        };

        const docRef = await db.collection("users").add(userObj);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (error) {
        console.error(error);
    }
}

async function readUser (userId) {
    try {
        
        // const docRef = db.doc("users/" + userId);
        console.log(userId);
        const querySnapshot = await db.collection("users").where("id", "==", userId).get();
        const docSnap = querySnapshot.docs.map(doc => doc.data())[0];
        console.log(docSnap);
        var user = User.fromJSON(docSnap);
        console.log("Document data:", user);
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function signUp() {
    try {
        var email = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var name = document.getElementById("name").value;
        var userType = document.getElementById("type").value;
        var accessLevel = AccessLevel.RESTRICTED;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        if (name.length < 4) {
            alert('Please enter a name.');
            return;
        }
        if (userType === "student" || userType === "teacher") {
            accessLevel = AccessLevel.PUBLIC;
        }
        
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
        console.log("Signed Up");
        await createUser(user.uid, name, email, userType, accessLevel);

        return user;
    } catch (error) {
        alert("Error signing up" + error);
        console.error(error);
    }
}
async function signIn() {
    try {
        var email = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

        const user = userCredential.user;
        console.log(user);
        console.log("Signed In");
        // window.location.href = "index.html";
        return await readUser(user.uid);
    } catch (error) {
        alert("Invalid email or password");
        console.error(error);
    }
}

async function signInWithGoogle() {
    try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const user = userCredential.user;
         window.location.href = "index.html";
        return user;
    } catch (error) {
        alert("Error signing in with Google");
        console.error(error);
    }
}

async function signOut() {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        alert("Error signing out");
        console.error(error);
    }
}
