// firebase.js (Firebase v9+)
import { getMessaging, getToken } from 'firebase/messaging';

// Utils
import { NULL } from '@/utils/constants';
import { initializeApp } from 'firebase/app';
// import { addUpdateQuery } from '@/api';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIND_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Request for FCM token
export const requestForToken = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const encodedFirebaseConfig = encodeURIComponent(
      JSON.stringify(firebaseConfig)
    );

    // for registration of service worker
    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?firebaseConfig=${encodedFirebaseConfig}`
    );
    const messaging = getMessaging(firebaseApp);
    const vapidKey =
      process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_WEB_PUSH_CERTIFICATES; // Ensure this is correctly set
    const currentToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
    if (currentToken) {
      return currentToken;
    } else {
      new Error('No token available. Ensure service worker is registered.');
      return NULL;
    }
  } else {
    return NULL;
  }
};

export const initializeNotifications = async (userId: any) => {
  // try {
  //   const permission = Notification.permission;
  //   if (permission === 'default') {
  //     const result = await Notification.requestPermission();
  //     if (result === 'granted') {
  //       const token = await requestForToken();
  //       if (token) {
  //         const res = await addUpdateQuery('auth/add-device-token', {
  //           user_id: userId,
  //           token: token,
  //         });
  //         if (res.data?.success === 1) {
  //           console.log('Device token added successfully');
  //         } else {
  //           console.error(
  //             'Error adding device token:',
  //             res.data?.message || res.data?.error_code
  //           );
  //         }
  //       }
  //     }
  //   }
  // } catch (error) {
  //   console.error('Error initializing notifications:', error);
  // }
};
