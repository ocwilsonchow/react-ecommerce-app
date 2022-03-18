import React, { useState, createContext, useContext, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [categories, setCategories] = useState();

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));

    const querySnapshot = await getDocs(q);
    setCategories(querySnapshot.docs.map((doc)=> ({...doc.data()})))
  };

  // Get products



  // Get single product



  // Create product



  // Update product



  // Delete product

  const contextData = {
    getCategories,
    categories,
  };

  return (
    <ShopContext.Provider value={contextData}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
