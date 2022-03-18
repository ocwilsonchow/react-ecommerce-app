import React from 'react';
import { Routes, BrowserRouter, Route, Router } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';

import App from '../layouts/App';
import { AuthProvider } from '../contexts/AuthContext';
import { CategoriesProvider} from '../contexts/CategoriesContext'

import PagesNotFound from '../pages/NotFound';

import PagesHome from '../pages/Home';
import PagesAuth from '../pages/Auth';
import PagesCategories from '../pages/Categories';
import PagesAdmin from '../pages/Admin'

function Routing() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
         <CategoriesProvider>
            <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<PagesHome />} />
              <Route path="/auth" element={<PagesAuth />} />
              <Route path="/categories" element={<PagesCategories />} />
              <Route path="/admin/stockmanagement" element={<PagesAdmin />} />
              {/* <Route path="/categories/:id" element={<PagesCategory />} />
          <Route path="/cart" element={<PagesCart />} />
          <Route path="/my/orders" element={<PagesMyOrders />} />
          <Route path="/my/account" element={<PagesMyAccount />} />
           */}

              <Route path="*" element={<PagesNotFound />} />
            </Route>
          </Routes>
         </CategoriesProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default Routing;
