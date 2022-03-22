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
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();
  const { user } = useAuth();


  // Create cart items
  const createCartItem = async (product)=> {
    console.log(product)
    if (!user) {
      toast({
        title: 'Login required',
        description: 'Please log in',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return console.log('login required');
    }

    await addDoc(collection(db, 'cartItems'), {
      userId: user.uid,
      productName: product.name,
      productId: product.id,
      productImageURL: product.image,
      price: product.price,
      quantity: 1,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        getCart()
        toast({
          title: 'Cart item created.',
          description: 'Cart successfully added to firestore',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Get cart
  const getCart = async () => {
    if (!user) return console.log('no user');
    if (user) {
      const q = query(
        collection(db, 'cartItems'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      setCartItems(
        querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  // Add item to the cart

  // Remove item from the cart

  const contextData = {
    cartItems,
    getCart,
    createCartItem,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
