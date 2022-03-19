import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext'

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState();
  const toast = useToast();
  const { user } = useAuth()

  // Create cart
  const createCart = async () => {
    const docRef = await addDoc(collection(db, 'carts'), {
      user: user.uid,
      items: [],
      createdAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          title: 'Cart created.',
          description: 'Cart successfully added to firestore',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Get cart
  const getCart = () => {


  }

  // Add item to the cart


  // Remove item from the cart


  const contextData = {
    cart,
    getCart,
    createCart
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
