// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, remove, update, query, orderByChild, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXA-mRInS2LqWzxU43eKNbVl_l-WQZang",
    authDomain: "moovie-35706.firebaseapp.com",
    projectId: "moovie-35706",
    storageBucket: "moovie-35706.firebasestorage.app",
    messagingSenderId: "1046379679363",
    appId: "1:1046379679363:web:f37ebc4a08008f58d695b6",
    measurementId: "G-DRMJYG3RW5",
    databaseURL: "https://moovie-35706-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export for use in other files
export { 
    app, 
    auth, 
    database, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    ref, 
    push, 
    set, 
    onValue, 
    remove, 
    update,
    query,
    orderByChild,
    get
};

console.log('🔥 Firebase initialized successfully!');
