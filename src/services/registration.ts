'use server';

import { getFirestore } from '@/lib/server/firebase-admin';

interface RegistrationData {
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  paymentId: string;
  screenshotPath: string; // Changed from screenshotUrl
}

export async function saveRegistration(data: RegistrationData) {
  try {
    const registrationDoc = {
      ...data,
      createdAt: new Date(),
    };

    const docRef = await getFirestore().collection('registrations').add(registrationDoc);

    return { success: true, insertedId: docRef.id };
  } catch (error) {
    console.error('Error saving registration to Firebase:', error);
    throw new Error('Could not save registration data.');
  }
}
