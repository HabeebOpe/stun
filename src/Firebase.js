import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAzlb3y3F8z-P1ZA91FHbpcKyt8cSgB4rA",
  authDomain: "xernd-app.firebaseapp.com",
  projectId: "xernd-app",
  storageBucket: "xernd-app.appspot.com",
  messagingSenderId: "17438690674",
  appId: "1:17438690674:web:2fe4d1ebcdf30196a7e1eb"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
