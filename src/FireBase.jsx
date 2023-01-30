import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from 'firebase/storage'


// const firebaseConfig = {
//     apiKey: "AIzaSyBlk0mAUwZBi3oCCkKCsphqw3d7SHsXaBA",
//     authDomain: "arjun-modify.firebaseapp.com",
//     projectId: "arjun-modify",
//     storageBucket: "arjun-modify.appspot.com",
//     messagingSenderId: "1082485395334",
//     appId: "1:1082485395334:web:42ea068749cbf2b3ec2607",
//     measurementId: "G-HBJDS5S4ZP"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyAYbcu6F1TiaUgitQjKJlE3dhtRv9UYUy0",
    authDomain: "latest-reels-1365c.firebaseapp.com",
    projectId: "latest-reels-1365c",
    storageBucket: "latest-reels-1365c.appspot.com",
    messagingSenderId: "1075170079197",
    appId: "1:1075170079197:web:066f1d2531e11537dd8634"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app)




