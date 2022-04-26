import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDebi5x1waPcld32uNubdisGq3MYbK8tZU",
  authDomain: "mymoney-clone.firebaseapp.com",
  projectId: "mymoney-clone",
  storageBucket: "mymoney-clone.appspot.com",
  messagingSenderId: "82215233323",
  appId: "1:82215233323:web:916f6d466b7e91b6f4c76e"
};

//init firebase

firebase.initializeApp(firebaseConfig)

// init service

const projectFireStore = firebase.firestore();

//authentiaction

const projectAuth  = firebase.auth()

//timestamp

const timeStamp = firebase.firestore.Timestamp

export { projectFireStore , projectAuth , timeStamp }