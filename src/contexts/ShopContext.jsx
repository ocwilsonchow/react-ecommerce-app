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
  getDoc,
  startAfter,
  startAt,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [categories, setCategories] = useState();
  const [similarProducts, setSimilarProducts] = useState();
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const [categoryProducts, setCategoryProducts] = useState();
  const toast = useToast();

 const [lastVisible, setLastVisible] = useState()
 const [prevFirstVisible, setPrevFirstVisible] = useState()

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));

    const querySnapshot = await getDocs(q);
    setCategories(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  // Get products
  // const getProducts = async () => {
  //   const first = query(collection(db, 'products'), orderBy('category', 'desc'), limit(15));
  //   const documentSnapshots = await getDocs(first);
  //   setProducts(documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id })));

  //   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
  //   console.log("last", lastVisible)

  //   const next = query(collection(db, "products"), orderBy('category', 'desc'), startAfter(lastVisible), limit(15))
  //   console.log(next)
  // };

  let documentSnapshots, nextDocumentSnaps,prevDocumentSnaps

  const getProducts = async () => {
    const first = query(
      collection(db, 'products'),
      orderBy('category', 'desc'),
      limit(15)
    );
    documentSnapshots = await getDocs(first);
    setProducts(
      documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );

    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    setPrevFirstVisible(documentSnapshots.docs[0])
  };

  const getNextProducts = async () => {
     console.log('getNext')
    const next = query(
      collection(db, 'products'),
      orderBy('category', 'desc'),
      startAfter(lastVisible),
      limit(15)
    );
    nextDocumentSnaps = await getDocs(next);
    setProducts(
      nextDocumentSnaps.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  const getPrevProducts = async () => {
    console.log('getPrev')
    const prev = query(collection(db, 'products'), orderBy('category', 'desc'), startAt(prevFirstVisible), limit(15))
    prevDocumentSnaps = await getDocs(prev)
    setProducts(prevDocumentSnaps.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

  // console.log(nextProducts);

  // Get category products
  const getCategoryProducts = async name => {
    setCategoryProducts();
    const q = query(collection(db, 'products'), where('category', '==', name));
    const querySnapshot = await getDocs(q);
    setCategoryProducts(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  // Get single product
  const getProduct = async id => {
    setProduct();
    const q = query(doc(db, 'products', id));
    const querySnapshot = await getDoc(q);
    setProduct({ ...querySnapshot.data(), id: querySnapshot.id });
  };

  // Get similar products
  const getSimilarProducts = async category => {
    setSimilarProducts();
    const q = query(
      collection(db, 'products'),
      where('category', '==', category.productCategory)
    );
    const querySnapshot = await getDocs(q);
    setSimilarProducts(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

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
          duration: 2000,
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
        duration: 2000,
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
        duration: 2000,
        isClosable: true,
      });
    });
  };

  // Delete product
  const deleteProduct = async productId => {
    await deleteDoc(doc(db, 'products', productId)).then(() => {
      getProducts();
      toast({
        title: 'Product deleted',
        description: 'Product successfully deleted',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const contextData = {
    getCategories,
    categories,
    createProduct,
    getProducts,
    products,
    increaseProductStock,
    decreaseProductStock,
    deleteProduct,
    getProduct,
    product,
    getSimilarProducts,
    similarProducts,
    categoryProducts,
    getCategoryProducts,
    getNextProducts,
    getPrevProducts
  };

  return (
    <ShopContext.Provider value={contextData}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
