import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyC5-hm63UKQZjMcjGW03haFvoS1zUaGlBY",
    authDomain: "project-djasof.firebaseapp.com",
    projectId: "project-djasof",
    storageBucket: "project-djasof.appspot.com",
    messagingSenderId: "525201239196",
    appId: "1:525201239196:web:021ef47a0202a488c01159",
    measurementId: "G-KQM6PS3NPB"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
