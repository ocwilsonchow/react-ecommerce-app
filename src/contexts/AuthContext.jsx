import React, { useState, createContext, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState()



  console.log(user)

  const signup = async (email, password) => {

    const newUser = await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        newUser = userCredential.user;
        setUser(newUser)
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  };

  const contextData = {
    signup,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
