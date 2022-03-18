import React, { useState, createContext, useContext, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState();

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));

    const querySnapshot = await getDocs(q);
    setCategories(querySnapshot.docs.map((doc)=> ({...doc.data()})))
  };

  const contextData = {
    getCategories,
    categories,
  };

  return (
    <CategoriesContext.Provider value={contextData}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
