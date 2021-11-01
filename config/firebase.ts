import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  //   apiKey: "AIzaSyDb4cGCJQTkRuZruOgf-KjsEmA0KCIVB1Y",

  //   authDomain: "acutedash-c1e65.firebaseapp.com",

  //   projectId: "acutedash-c1e65",

  //   storageBucket: "acutedash-c1e65.appspot.com",

  //   messagingSenderId: "248482893000",

  //   appId: "1:248482893000:web:5b86e95fdfde2c362f29fd",

  //   measurementId: "G-7GQEK6S1T3",
};

let firebaseApp;
if (!firebase.getApps().length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.getApp();
}
export const db = getFirestore();
export const auth = getAuth();
export default firebase;
