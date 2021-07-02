import firebase from 'firebase';

const firebaseConfig = {
apiKey: "AIzaSyBWI2b0jIDzUTh4ZJj6M54IQgYgzgr0Aac",
  authDomain: "clone-ffa16.firebaseapp.com",
  databaseURL: "https://clone-ffa16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clone-ffa16",
  storageBucket: "clone-ffa16.appspot.com",
  messagingSenderId: "832915993561",
  appId: "1:832915993561:web:1ccd6c7c0b12cc3f911fc8",
  measurementId: "G-7X0D856WRC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db , auth};