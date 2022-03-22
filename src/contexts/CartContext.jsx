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
  setDoc,
  deleteDoc,
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
  const createCartItem = async product => {
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
        getCart();
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

  // Increase product quantity in cart
  const increaseCartItemQuantity = async id => {
    await updateDoc(doc(db, 'cartItems', id), {
      quantity: increment(1),
    }).then(() => {
      getCart();
      toast({
        title: 'Item added',
        description: 'Item added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  // Decrease Quantity OR Remove item from the cart
  const decreaseCartItemQuantity = async (id, quantity) => {
    console.log(id, quantity)
    if (quantity < 1) {
      await deleteDoc(doc(db, 'cartItems', id))
        .then(() => {
        getCart();
        toast({
          title: 'Item removed from cart',
          description: 'Item removed from cart',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      });
      return
    }

    await updateDoc(doc(db, 'cartItems', id), {
      quantity: increment(-1),
    }).then(() => {
      getCart();
      toast({
        title: 'Item removed',
        description: 'Item removed',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const contextData = {
    cartItems,
    getCart,
    createCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
