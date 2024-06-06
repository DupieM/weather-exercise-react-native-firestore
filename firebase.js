import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    //... YOUR FIREBASE_CONFIGURATION
    apiKey: "AIzaSyC3Zoyp3M7sNDeH8aVst9DPCsMKrdPnWhM",
    authDomain: "class-work-86a22.firebaseapp.com",
    projectId: "class-work-86a22",
    storageBucket: "class-work-86a22.appspot.com",
    messagingSenderId: "379712216589",
    appId: "1:379712216589:web:8f8f980c78589fbf6e7f44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export var db = getFirestore(app)