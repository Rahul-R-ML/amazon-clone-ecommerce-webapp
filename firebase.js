import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAKXGtIucBZwvP_DsrLz4PL1iAqm9D4qfo',
  authDomain: 'maplelabs-2.firebaseapp.com',
  projectId: 'maplelabs-2',
  storageBucket: 'maplelabs-2.appspot.com',
  messagingSenderId: '776317615177',
  appId: '1:776317615177:web:06c5ab94464d12a55cd398',
  measurementId: 'G-QB0F3EB6JN',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
console.log('Firebase client called');
export const db = app.firestore();
export default db;
