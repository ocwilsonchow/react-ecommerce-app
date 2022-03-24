import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import { useCart } from '../contexts/CartContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigation = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  // Update User's Profile

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
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Sign In
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        setUser(userCredential.user);

        navigation('/');
        toast({
          title: 'Logged in.',
          description: "You've successfully logged in",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // Sign Out
  const signout = async () => {
    await signOut(auth).then(() => {
      setUser();
      navigation('/auth');
      toast({
        title: 'Logged out.',
        description: "You've successfully logged out",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  // Context Data
  const contextData = {
    signup,
    signout,
    login,
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
