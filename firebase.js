import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCcJ48Gsg5B1Z1JnPZ440cjqvEqsvKBcco",
  authDomain: "docs-demo-5f35e.firebaseapp.com",
  projectId: "docs-demo-5f35e",
  storageBucket: "docs-demo-5f35e.appspot.com",
  messagingSenderId: "339790384025",
  appId: "1:339790384025:web:4593b3532c795157bca108",
};

// initialize new app, or use existing one
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
