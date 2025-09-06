import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBF14zqquegac4RKWuC_V5vi7pdZziWlwU",
    authDomain: "olx-clone-c0402.firebaseapp.com",
    projectId: "olx-clone-c0402",
    storageBucket: "olx-clone-c0402.firebasestorage.app",
    messagingSenderId: "1072836606899",
    appId: "1:1072836606899:web:bdaf879e75643261df29c6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
