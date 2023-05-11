import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAro1QAzlnNIiVJrIZ5srL4K0CUSAjKNGY",
  authDomain: "book-tracking-3dd84.firebaseapp.com",
  projectId: "book-tracking-3dd84",
  storageBucket: "book-tracking-3dd84.appspot.com",
  messagingSenderId: "870331592968",
  appId: "1:870331592968:web:64945b94bdcf5156bebcbd",
  measurementId: "G-7N72GNQ64N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
