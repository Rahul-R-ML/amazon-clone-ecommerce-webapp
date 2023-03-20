import * as admin from 'firebase-admin';
// firebase-admin settings
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: 'service_account',
        projectId: 'maplelabs-2',
        private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
          ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, '\n')
          : undefined,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u3uwt%40maplelabs-2.iam.gserviceaccount.com',
      }),
    })
  : admin.app();
export const db = app.firestore();
console.log('Firebase admin called');
db.timestamp = admin.firestore.FieldValue.serverTimestamp;
