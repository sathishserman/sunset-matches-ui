import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYsLtj1_VTe6ONkuTnwBAGSKKz9qgUxyc",
    authDomain: "sunset-matches-a9651.firebaseapp.com",
    projectId: "sunset-matches-a9651",
    storageBucket: "sunset-matches-a9651.appspot.com",
    messagingSenderId: "102477405782",
    appId: "1:102477405782:web:ef1fa6b09a3b1ab5d3a5f7",
    measurementId: "G-JSLZ8HX293"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };