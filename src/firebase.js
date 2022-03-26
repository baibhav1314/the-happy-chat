import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAE_KjyTDrPbdTuFWtmYA7TiZeW3Dbki_I",
    authDomain: "the-happy-chat-ac563.firebaseapp.com",
    projectId: "the-happy-chat-ac563",
    storageBucket: "the-happy-chat-ac563.appspot.com",
    messagingSenderId: "902447421498",
    appId: "1:902447421498:web:4f2c307e6b2086f819fd03",
    measurementId: "G-QLWX60EX71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
