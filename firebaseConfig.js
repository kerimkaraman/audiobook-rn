import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaJdaE3ndgTL1piMHB3c4gYszxgGa4GGM",
  authDomain: "audiobook-8840c.firebaseapp.com",
  projectId: "audiobook-8840c",
  storageBucket: "audiobook-8840c.appspot.com",
  messagingSenderId: "301589312613",
  appId: "1:301589312613:web:c89eb9ed1a729d67f5428c",
  measurementId: "G-VGNRMEKS0N",
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
