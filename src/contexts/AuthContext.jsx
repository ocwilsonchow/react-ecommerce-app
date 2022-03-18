import React, { useState, createContext, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth();

export function AuthProvider({ children }) {




  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const contextData = {};

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useCategories() {
  return useContext(AuthContext);
}
