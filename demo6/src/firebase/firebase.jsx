import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDLYOz3aw9_01aLDBltnAbRUwVkha4LENo",
    authDomain: "crud-app-5ec48.firebaseapp.com",
    projectId: "crud-app-5ec48",
    storageBucket: "crud-app-5ec48.appspot.com",
    messagingSenderId: "120040737420",
    appId: "1:120040737420:web:f585c80002bd6808b089a9",
    measurementId: "G-YP4W9M86XL"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage();

// import { initializeApp } from "firebase/app"
// import { getStorage } from "firebase/storage"

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app, process.env.BUCKET_URL);
// export default storage
