import firebase from 'firebase';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBDwLexb2VEViprRAXBVQYi1x1wgPJ9o3E',
  authDomain: 'amzn-2-yt-58840.firebaseapp.com',
  projectId: 'amzn-2-yt-58840',
  storageBucket: 'amzn-2-yt-58840.appspot.com',
  messagingSenderId: '117936636660',
  appId: '1:117936636660:web:3d3ed367fe52ced5ed94a1',
};

const app = !firebase.apps.length
  ? initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
