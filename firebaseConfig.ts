// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import RNStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSzKkK6f5OjugvkyWMQ85NO7ypUUaIgc",
  authDomain: "daeliminsta-ab472.firebaseapp.com",
  projectId: "daeliminsta-ab472",
  storageBucket: "daeliminsta-ab472.firebasestorage.app",
  messagingSenderId: "742438998903",
  appId: "1:742438998903:web:0426463e38b9aadd8c0772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication(인증관련 객체)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(RNStorage),
});
//firebase의 DB인 firestore 초기화 및 가져오기
export const firestore = getFirestore(app);
// firebase 대용량 미디어 파일 Storage 초기화 및 가져오기
export const storage = getStorage(app);
