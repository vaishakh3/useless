import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyDYBQjxwOPHVeJg9QmR_-6vX8WeQmWuqv4",
  authDomain: "dating-app-bolt.firebaseapp.com",
  projectId: "dating-app-bolt",
  storageBucket: "dating-app-bolt.appspot.com",
  messagingSenderId: "536780971675",
  clientId: "536780971675-ii4th2jbve5f23e8r3s3ilndkjeuhcr0.apps.googleusercontent.com",
  appId: "1:536780971675:web:8b9b9b9b9b9b9b9b9b9b9b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      toast.error('Popup was blocked. Trying redirect method...');
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (redirectError: any) {
        toast.error('Failed to sign in. Please check your popup blocker settings.');
        console.error('Redirect sign-in error:', redirectError);
      }
    } else {
      toast.error('Failed to sign in. Please try again.');
      console.error('Sign-in error:', error);
    }
  }
};