// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase , ref, get, update, increment} from "firebase/database";  
// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAPHXQ4-_NAN0QkRPlaKY8itbMVChLUfU0",
  authDomain: "recipeapp-4cc9f.firebaseapp.com",
  databaseURL: "https://recipeapp-4cc9f-default-rtdb.firebaseio.com",
  projectId: "recipeapp-4cc9f",
  storageBucket: "recipeapp-4cc9f.appspot.com",
  messagingSenderId: "829815605844",
  appId: "1:829815605844:web:fe5e142854fe4ac926fbc1"

};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const database = getDatabase(app); 
export { auth,database,ref, get, update, increment };
