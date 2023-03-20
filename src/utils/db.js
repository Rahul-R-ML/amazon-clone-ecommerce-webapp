import * as admin from 'firebase-admin';
import serviceAccountKey from '../../service_acc_key.json';
// firebase-admin settings
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    })
  : admin.app();
export const db = app.firestore();
console.log('Firebase admin called');
db.timestamp = admin.firestore.FieldValue.serverTimestamp;
