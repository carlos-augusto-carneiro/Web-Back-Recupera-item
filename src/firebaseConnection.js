import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD_MsPw5Oz2N5ddLZLlodmNxfnxzpNhKCI",
  authDomain: "achados-e-perdidos-app.firebaseapp.com",
  projectId: "achados-e-perdidos-app",
  storageBucket: "achados-e-perdidos-app.firebasestorage.app",
  messagingSenderId: "556680176803",
  appId: "1:556680176803:web:4080170f0ec2afe1eb4b16",
  measurementId: "G-KPX0Y6X4BJ"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export {db}