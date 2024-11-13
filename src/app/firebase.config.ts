import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'my-code-resources',
  appId: '1:1005255827672:web:6a10fcc70f1db5986f37ad',
  storageBucket: 'my-code-resources.appspot.com',
  apiKey: 'AIzaSyAzYRiVHa1bphTvdpJbp88Hdbwtn6rTt1g',
  authDomain: 'my-code-resources.firebaseapp.com',
  messagingSenderId: '1005255827672',
  measurementId: 'G-PQYV4TTM0Q',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };