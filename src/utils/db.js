import * as admin from 'firebase-admin';
import serviceAccount from '../../service_acc_key.json';
// firebase-admin settings
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
export const db = app.firestore();
db.timestamp = admin.firestore.FieldValue.serverTimestamp;
