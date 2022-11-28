import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj463xxp7XegX_Ia_JBUGdT_NGoOeU0kg",
  authDomain: "myfinance-807ed.firebaseapp.com",
  projectId: "myfinance-807ed",
  storageBucket: "myfinance-807ed.appspot.com",
  messagingSenderId: "453682310227",
  appId: "1:453682310227:web:48aa097b179965b4d9aaa6",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
