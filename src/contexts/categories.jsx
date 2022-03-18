import React, { useState, createContext, useContext }   from 'react'
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config'

const CategoriesContext = createContext()

export function CategoriesProvider({children}) {



  const contextData = {}

  return <CategoriesContext.Provider value={contextData}>{children}</CategoriesContext.Provider>

}

export function useCategories() {
  return useContext(CategoriesContext)
}
