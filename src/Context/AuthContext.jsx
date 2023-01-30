import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  query,collection,orderBy,onSnapshot
} from 'firebase/firestore'
import { auth,  database  } from "../FireBase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    getUserDataFromDataBase();
  }, []);

  const getUserDataFromDataBase = async() => {
    function getArrangedData() {
      return new Promise((resolve, reject) => {
        const userRef = collection(database, "users");

        const q = query(userRef, orderBy("createdAt", "desc"));

        onSnapshot(q, (querySnapshot) => {
          const posts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          if (posts) {
            resolve(posts);
          } else {
            reject("Unable to fetch Data");
          }
        });
      });
    }


    const data = await getArrangedData();
    setDbUser()
  };


  async function signup(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  }

  async function login(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res;
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  const store = {
    user,
    signup,
    login,
    logout,
    dbUser
  };
  return (
    <AuthContext.Provider value={store}>
      <>{!loading && children}</>
    </AuthContext.Provider>
  );
}
