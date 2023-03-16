import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDE4yoKyN0qq2fI900RHocmryJvYu6SLBs',
  authDomain: 'maplelabs-98011.firebaseapp.com',
  projectId: 'maplelabs-98011',
  storageBucket: 'maplelabs-98011.appspot.com',
  messagingSenderId: '257734588346',
  appId: '1:257734588346:web:4e8db5b24626a70f280f83',
  measurementId: 'G-E4Q0T5LEE8',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
export default db;
