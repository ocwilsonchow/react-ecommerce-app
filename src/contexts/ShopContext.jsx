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
  deleteDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const toast = useToast();

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));

    const querySnapshot = await getDocs(q);
    setCategories(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  // Get products
  const getProducts = async () => {
    const q = query(collection(db, 'products'), orderBy('category', 'desc'));
    const querySnapshot = await getDocs(q);
    setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  // Get single product

  // Create product
  const createProduct = async (
    name,
    category,
    description,
    price,
    stock,
    image
  ) => {
    const docRef = await addDoc(collection(db, 'products'), {
      name: name,
      category: category,
      description: description,
      price: price,
      stock: Number(stock),
      image: image,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          title: 'Product created.',
          description: 'Product successfully added to firestore',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Increase stock count
  const increaseProductStock = async id => {
    await updateDoc(doc(db, 'products', id), {
      stock: increment(1),
    }).then(() => {
      getProducts();
      toast({
        title: 'Stock added',
        description: 'Product stock successfully updated',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    });
  };

  // Decrease stock count
  const decreaseProductStock = async id => {
    await updateDoc(doc(db, 'products', id), {
      stock: increment(-1),
    }).then(() => {
      getProducts();
      toast({
        title: 'Stock removed',
        description: 'Product stock successfully updated',
        status: 'info',
        duration: 6000,
        isClosable: true,
      });
    });
  };

  // Delete product
 const deleteProduct =async  (productId) => {
    await deleteDoc(doc(db, "products", productId))
    .then(() => {
      getProducts();
      toast({
        title: 'Product deleted',
        description: 'Product successfully deleted',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    });
 }


  const contextData = {
    getCategories,
    categories,
    createProduct,
    getProducts,
    products,
    increaseProductStock,
    decreaseProductStock,
    deleteProduct
  };

  return (
    <ShopContext.Provider value={contextData}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
