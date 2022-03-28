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
  increment,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, anonymousLogin, getUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const toast = useToast();
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Reset cart items on log out
  const resetCartOnLogout = () => {
    setFavoriteItems([]);
    setCartItems([]);
  };

  useEffect(() => {
    if (cartItems) {
      calculateCartTotal();
    }
  }, [cartItems]);

  // Get User's transaction history
  const getTransactionHistory = async () => {
    const q = query(
      collection(db, 'completedTransactions'),
      where('customerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTransactionHistory(queryData);
  };

  // Calculate cart total amount
  const calculateCartTotal = () => {
    let newArr = [];
    cartItems.map(item => {
      newArr.push(Number(item.price) * item.quantity);
    });
    const sum = newArr.reduce((prev, curr) => prev + curr, 0);
    setCartTotal(sum);
  };

  // Print Completed Transaction
  const handleCompletedTransaction = async order => {
    await addDoc(collection(db, 'completedTransactions'), {
      id: order.id,
      customerId: user.uid,
      createdAt: serverTimestamp(),
      intent: order.intent,
      payer: order.payer,
      purchase_units: order.purchase_units,
      status: order.status,
      update_time: order.update_time,
      intent: order.intent,
    }).then(() => {
      getTransactionHistory();
      toast({
        title: 'Thank you!',
        description: 'Payment has been successful.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    });
  };

  // Create favorite items
  const createFavoriteItems = async product => {
    if (!user) {
      await anonymousLogin();
    }
    // Check if this item is already in the favorites
    const q = query(
      collection(db, 'favoriteItems'),
      where('userId', '==', user?.uid),
      where('productId', '==', product.id)
    );
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (queryData.length > 0) {
      return removeFavoriteItem(queryData[0]);
    }

    if (user) {
      await addDoc(collection(db, 'favoriteItems'), {
        userId: user.uid,
        productName: product.name,
        productId: product.id,
        productImageURL: product.image,
        price: product.price,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          getFavorites();
          toast({
            title: 'Added!',
            description: 'Product added to Your favorites',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Remove favorite item
  const removeFavoriteItem = async item => {
    await deleteDoc(doc(db, 'favoriteItems', item.id)).then(() => {
      getFavorites();
      toast({
        title: 'Item removed',
        description: 'Item removed from your cart',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    });
    return;
  };

  // Create cart items
  const createCartItem = async product => {
    if (!user) {
      await anonymousLogin();
    }

    // Check if this item is already in the cart
    const q = query(
      collection(db, 'cartItems'),
      where('userId', '==', user.uid),
      where('productId', '==', product.id)
    );
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (queryData.length > 0) {
      return increaseCartItemQuantity(queryData[0].id);
    }
    await addDoc(collection(db, 'cartItems'), {
      userId: user.uid,
      productName: product.name || product.productName,
      productId: product.id,
      productImageURL: product.image || product.productImageURL,
      price: product.price,
      quantity: 1,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        getCart();
        toast({
          title: 'Created.',
          description: 'Cart successfully added to firestore',
          status: 'info',
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
    if (!user) return;
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

  // Get favorites
  const getFavorites = async () => {
    if (!user) return;
    if (user) {
      const q = query(
        collection(db, 'favoriteItems'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      setFavoriteItems(
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
        description: 'Item added to your cart',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  // Decrease Quantity OR Remove item from the cart
  const decreaseCartItemQuantity = async (id, quantity) => {
    if (quantity < 1) {
      await deleteDoc(doc(db, 'cartItems', id)).then(() => {
        getCart();
        toast({
          title: 'Item removed',
          description: 'Item removed from your cart',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      });
      return;
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
    resetCartOnLogout,
    createFavoriteItems,
    favoriteItems,
    getFavorites,
    removeFavoriteItem,
    cartTotal,
    calculateCartTotal,
    handleCompletedTransaction,
    transactionHistory,
    getTransactionHistory,
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
