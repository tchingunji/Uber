import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCCCQZ0e0ZZWEU2R3o6iWjE3HsrJluUJnY",
    authDomain: "motoristas-32c3f.firebaseapp.com",
    projectId: "motoristas-32c3f",
    storageBucket: "motoristas-32c3f.appspot.com",
    messagingSenderId: "1007604362634",
    appId: "1:1007604362634:web:426a5a9d7e0f83377dec73"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default getFirestore(app);