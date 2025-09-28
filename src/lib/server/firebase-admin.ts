
import admin from 'firebase-admin';
import type { Bucket } from '@google-cloud/storage';

// This ensures we only initialize the app once
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('The FIREBASE_PRIVATE_KEY environment variable is not set.');
    }
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      storageBucket: "cloudx-cloudascend.firebasestorage.app",
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
    throw new Error('Failed to initialize Firebase Admin SDK. Please check your environment variables.');
  }
}

const firestore = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

function getFirestore() {
  return firestore;
}

function getAuth() {
  return auth;
}

function getStorage() {
  return storage;
}

export { getFirestore, getAuth, getStorage };
