import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const ShopContext = createContext();


export function ShopProvider({ children }) {
  const [categories, setCategories] = useState();

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));

    const querySnapshot = await getDocs(q);
    setCategories(querySnapshot.docs.map(doc => ({ ...doc.data() })));
  };

  // Get products

  // Get single product

  // Upload photo and create imageURL
  const uploadImage = async () => {};

  // Create product
  const createProduct = async (name, category, description, price, stock, image) => {
    const docRef = await addDoc(collection(db, 'products'), {
      name: name,
      category: category,
      description: description,
      price: price,
      stock: stock,
      image: image,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        console.log('Document written with ID: ', docRef.id);
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
  };

  return (
    <ShopContext.Provider value={contextData}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
