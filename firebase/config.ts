// FIX: Switched to v8/compat imports to resolve module export errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLGEhKVQHNdolfBlvOgNoiL7ASrvEXaFI",
  authDomain: "uneco-nc-interatedproject.firebaseapp.com",
  projectId: "uneco-nc-interatedproject",
  storageBucket: "uneco-nc-interatedproject.appspot.com",
  messagingSenderId: "877411322009",
  appId: "1:877411322009:web:8aae191ebb24d9dfd0d008",
  measurementId: "G-LRWJHLSR9E"
};

// FIX: Updated Firebase initialization to v8/compat style.
// Added a check to prevent re-initialization.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


// Get Auth and Firestore instances using v8/compat style
export const auth = firebase.auth();
export const db = firebase.firestore();
