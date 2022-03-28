import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigation = useNavigate();
  const toast = useToast();

  useEffect(() => {
     auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const getUser = () => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
    console.log("Getting user")
  }

  // Update User's Profile
  const updateUserProfile = async (displayName, imageURL) => {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: imageURL || user.photoURL,
    })
      .then(() => {
        toast({
          title: 'Profile Updated',
          description: "You've successfully updated your profile",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        navigation('/');
      })
      .catch(error => {
        const errorMessage = error.message;
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  // Sign Up
  const signup = async (email, password, username) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        setUser(userCredential.user);
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        navigation('/');
        toast({
          title: 'Account created.',
          description: "You've successfully signed up",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  // Sign In Anonymously
  const anonymousLogin = async () => {
    await signInAnonymously(auth)
      .then(userCredential => {
        setUser(userCredential.user);
        toast({
          title: 'Welcome!',
          description: 'You have successfully signed in as a guest, enjoy!',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        toast({
          title: 'Error',
          description: errorMessage,
          position: 'top',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
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
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'warning',
          duration: 4000,
          position: 'top',
          isClosable: true,
        });
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
        position: 'top',
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
    getUser,
    user,
    updateUserProfile,
    anonymousLogin,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
