import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs0XhraQIYMSvPANlmsQN55macoKi_tqo",
  authDomain: "tasks-5410a.firebaseapp.com",
  projectId: "tasks-5410a",
  storageBucket: "tasks-5410a.appspot.com",
  messagingSenderId: "388214454881",
  appId: "1:388214454881:web:bba57ab501c1c464b78820",
  measurementId: "G-E9K1RPM1J4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
