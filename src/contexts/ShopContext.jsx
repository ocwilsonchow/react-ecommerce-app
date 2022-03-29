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
} from 'firebase/firestore';
import { db } from '../firebase';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [categories, setCategories] = useState();
  const [similarProducts, setSimilarProducts] = useState();
  const [products, setProducts] = useState();
  const [queryProducts, setQueryProducts] = useState()
  const { user } = useAuth();
  const [product, setProduct] = useState();
  const [categoryProducts, setCategoryProducts] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 18;
  const productsVisited = pageNumber * productsPerPage;
  const numberOfPages = Math.ceil(products?.length / productsPerPage);

  const [displayProducts, setDisplayProducts] = useState();
  const [queryDisplayProducts, setQueryDisplayProducts] = useState()

  useEffect(() => {
    if (products) {
      updateDisplayProducts();
    }
  }, [products]);

  // Set the array of products to be displayed
  const updateDisplayProducts = () => {
    setDisplayProducts(
      products?.slice(productsVisited, productsVisited + productsPerPage)
    );
  };

  const updateQueryDisplayProducts = () => {
    setQueryDisplayProducts(
      products?.slice(productsVisited, productsVisited + productsPerPage)
    );
  };

  // Set next product page
  const increasePageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  //Set previous product page
  const decreasePageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  // Get products
  const getProducts = async () => {
    const q = query(collection(db, 'products'), orderBy('category', 'desc'));
    const documentSnapshots = await getDocs(q);
    setProducts(
      documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  //Firestore.collection(collectionName).orderBy(field).where(field, ">=", keyword.toUpperCase()).where(field, "<=", keyword.toUpperCase() + "\uf8ff").get()

  // Get products based on queries
  const getQueryProducts = async queryText => {
    const q = query(
      collection(db, 'products'),
      orderBy("name"),
      where('name', '>=', queryText),
      where('name', '<=', queryText + '\uf8ff')
    );
    const documentSnapshots = await getDocs(q);
    if (documentSnapshots.docs.length > 0) {
      setQueryProducts(
        documentSnapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      );
      navigate("/products/query")
    } else {
       toast({
          title: 'No result',
          description: 'No matched search result.',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
    }
  };

  // Get categories
  const getCategories = async () => {
    const q = query(collection(db, 'categories'));
    const querySnapshot = await getDocs(q);
    setCategories(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

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
    if (user.uid !== process.env.REACT_APP_ADMIN_UID) {
      return toast({
        title: 'Permission Restricted',
        description: 'You do not have the permission',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }

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
    if (user.uid !== process.env.REACT_APP_ADMIN_UID) {
      return toast({
        title: 'Permission Restricted',
        description: 'You do not have the permission',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
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
    if (user.uid !== process.env.REACT_APP_ADMIN_UID) {
      return toast({
        title: 'Permission Restricted',
        description: 'You do not have the permission',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
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
    displayProducts,
    increasePageNumber,
    decreasePageNumber,
    pageNumber,
    updateDisplayProducts,
    updateQueryDisplayProducts,
    getQueryProducts,
    queryProducts,
    queryDisplayProducts
  };

  return (
    <ShopContext.Provider value={contextData}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
