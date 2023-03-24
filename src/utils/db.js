import * as admin from 'firebase-admin';
// firebase-admin settings
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      ),
    })
  : admin.app();
export const db = app.firestore();
db.timestamp = admin.firestore.FieldValue.serverTimestamp;
