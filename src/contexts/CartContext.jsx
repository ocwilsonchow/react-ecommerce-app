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
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const toast = useToast();
  const { user, anonymousLogin } = useAuth();

  // Reset cart items on log out
  const resetCartOnLogout = () => {
    setFavoriteItems([])
    setCartItems([]);
    console.log('cart items cleaned');
  };

  useEffect(() => {
    if (cartItems) {
      calculateCartTotal()
    }
  }, [cartItems])

  // Calculate cart total amount
  const calculateCartTotal = () => {
    let newArr = []
    cartItems.map((item) => {
      newArr.push(Number(item.price)*(item.quantity))
    })
    const sum = newArr.reduce((prev, curr) => prev + curr, 0)
    setCartTotal(sum)
  }

  // Create favorite items
  const createFavoriteItems = async product => {
    if (!user) {
      await anonymousLogin()
    }
     // Check if this item is already in the favorites
    const q = query(
      collection(db, 'favoriteItems'),
      where('userId', '==', user.uid),
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
  const removeFavoriteItem = async (item) => {
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

  }

  // Create cart items
  const createCartItem = async product => {

    if (!user) {
      await anonymousLogin()}

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
    calculateCartTotal
  };

  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
