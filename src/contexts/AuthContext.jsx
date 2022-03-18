import React, { useState, createContext, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigation = useNavigate();
   const toast = useToast()

  console.log(user);

  // Sign Up
  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        setUser(userCredential.user);
        navigation('/');
        toast({
          title: 'Account created.',
          description: "You've successfully signed up",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Sign Out
  const signout = async () => {
    await signOut(auth).then(() => {

        toast({
          title: 'Logged out.',
          description: "You've successfully logged out",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
    })
  }





  // Context Data
  const contextData = {
    signup,
    signout
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
