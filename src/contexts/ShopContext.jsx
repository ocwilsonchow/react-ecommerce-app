import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
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
      stock: stock,
      image: image,
      createdAt: serverTimestamp(),
    }).then(() => {
        toast({
          title: 'Product created.',
          description: "Product successfully added to firestore",
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Update product

  // Delete product

  const contextData = {
    getCategories,
    categories,
    createProduct,
    getProducts,
    products,
  };

  console.log(products);

  return (
    <ShopContext.Provider value={contextData}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
