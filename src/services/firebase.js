import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAhNfM4uCA0cDJrbbecRx64tBjPBZu7kPU",
    authDomain: "cricket-test-project.firebaseapp.com",
    projectId: "cricket-test-project",
    storageBucket: "cricket-test-project.appspot.com",
    messagingSenderId: "732277921515",
    appId: "1:732277921515:web:2d192e1bb3abf61341d0ae"
  };
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }

  export const auth = firebase.auth()
  export const db = firebase.firestore()
export default firebase