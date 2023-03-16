import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import db from '../../../firebase';
import { firestore } from 'firebase-admin';

// Secure a connection to Firebase from the backend
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: 'service_account',
        projectId: 'maplelabs-98011',
        private_key_id: '4285ac9bcfee95667f29834b631f82c9a4cde99d',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGlVIpqpfeMzik\nQpPOCzUK00uVBYUdBS8Xz3DXe3sAGJWWfJKEWOLPcmbfhAFiYb53BTMVCJwLdjlv\nLML6MSYp5bq9t87JdR3O1KED5Fxv5R5gpPllYET+UiECF74qU3btCuV4NA5EH+yT\n2vKKOIycERnWGkAz0H4oS6OSGhYmLCSUhvp58q2p/Wn+xZfJtSeINYdQIy2LZisj\nMkGtlckpV0g1Y3PGafz9G+LDHFLfPLHuOoXqMXbrXy+WsP2fs3F/wfPDcIX+MfCq\nc5YGwMMhixXCYL8YTZl/kD7Q+AZWbqubXhB5gtEtPK2lfnYNnj6g74wpPZjVaDTD\nHvrhBqN1AgMBAAECggEADJV/zGYkE4+ZYkdZyG/LX7E+E+ZypgEjF9YsZ2tKwxnL\nuOqR+lMLpGuyey2JTOu2vyIUN5wBD3ThdNsYS/R7X6JQMB+Kuhdy2R1+SpnZBbo2\nL5ekujjchmU79D7+7P23BpRvMCvUT5raShBQ2FN3DZjD0158fQwUQodwiRygFLEQ\nzHGapPFJpg/xsziZBh7rPsRJHb/XmTQLmO8BGfD/y1kKh8YdsXHwD2IB1gkAMr6k\nZ9JLctxEquSJU3PJ2l2xYsVjBuiWrKi7giW6QmwYINvQBJHRtIqk78w1ysvFY3/g\n3nQyAYI4qIper1ZieJC8qG4/mUg1JqbEK18cMM5mLQKBgQDvAQ6g9nUwRrEw6SB9\nJQow3SFiHQdXRH3byQn5MJSvIa1sKORe1Eynmq5xWRLXhQ28Ycyy8j868RB27t4W\nH57S2xnGH40IL4rF3GYFLi2TU88PFMXgTZV7P3gugWHbZgmX6+2TS9UHJ5SfBQnP\ny5sQhyLdO29fQO2wXTBh75QSNwKBgQDUtGyCSX00784t6skGwApc87jcRlf6dUjK\n0qF4M+P2EjbnhpHamQCzTrKnWTgB3wg9Fif3g0ZnrBIs2g4fpZZEvYNEXjHtDl2t\n7NwKw9dkBHn0CeSzX6AMWM2v1yoow8+iLnrgz3nAupMVu9IMlkO0p8Rr5CPB8PJs\nGkeiv9nRswKBgCR2FtM7hhk9T57Ukd5Fnk5iDcu3/fy0ODclbl4TqTsmehx8CIrm\n/GK9WEt2eUdjxvqsONw71KWbTRW3zy202Tf1sPLmsU9EYXlZ7D5yEwXczUPRuXZE\nn79TqXP+zPz5jhEdLvs/oFodEbFIxXxr5VYaJ5l0jcMMVraHIPBv6jj1AoGBAK7F\nRPdUnO1XMSknZmAGgT1ZAQb1QarInbQRl50lveRdmQFp4AQmfZ3XRxIcS9m1wZY3\n00Ubd0kN6K0zyjEUpMD8mpQddZZbnHuhSDgMLLnAt9feHS2Jn/8lJHScLcbrBXs0\nB8EamObUJrDP78pp2V3iD5G7FepwKTDL8xp12urjAoGAEWuxhiKbdzW7HlbrCbA+\nTecoKJ3AvzEdX8IoXWg8iuPGhHNr+OTlvYyDYoJCvNYiT+xEyJV0UnV+MyMquipf\n+CSxiwzsYxfQqHAYTqCk0DM0MDENPGG72cXt9BYv/G/mrCY2RztWg8RfbIaYr8+u\nb/uXQAEMdKSL/8ALZjeO7yQ=\n-----END PRIVATE KEY-----\n',
        clientEmail:
          'firebase-adminsdk-q3d2v@maplelabs-98011.iam.gserviceaccount.com',
        client_id: '104371974165566429336',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q3d2v%40maplelabs-98011.iam.gserviceaccount.com',
      }),
    })
  : admin.app();

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET; // We use stripe cli to get this

const fulfillOrder = async (session) => {
  const images = JSON.parse(session.metadata.images).map((image) =>
    JSON.stringify(image)
  );
  // console.log("Fulfilling order", session);

  return admin
    .firestore()
    .collection('AMAZON_users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: images,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    })
    .catch((err) => console.log('Error Occured!', err.message));
};

// DOCS on Stripe - Connect Webhoohs https://stripe.com/docs/connect/webhooks
export default async (req, res) => {
  if (req.method === 'POST') {
    // using this because to generate certificate
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;
    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log('ERROR', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Fulfill the order => put it inside firebase db
      return fulfillOrder(session)
        .then(() => res.status(200).json({ received: true }))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
    console.log('Webhook received');
    return res.status(200).json({ received: true });
  }
};

export const config = {
  api: {
    bodyParser: false, // Useless for webhooks
    externalResolver: true,
  },
};
