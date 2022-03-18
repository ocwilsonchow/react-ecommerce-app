import React from 'react';
import { Routes, BrowserRouter, Route, Router } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';

import PagesNotFound from '../pages/NotFound';
import App from '../layouts/App';

import PagesHome from '../pages/Home';
import PagesAuth from '../pages/Auth';
import PagesCategories from '../pages/Categories';
import { AuthProvider } from '../contexts/AuthContext';

function Routing() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<PagesHome />} />
            <Route path="/auth" element={<PagesAuth />} />
            <Route path="/categories" element={<PagesCategories />} />
            {/* <Route path="/categories/:id" element={<PagesCategory />} />
          <Route path="/cart" element={<PagesCart />} />
          <Route path="/my/orders" element={<PagesMyOrders />} />
          <Route path="/my/account" element={<PagesMyAccount />} />
          <Route path="/admin/stockmanagement" element={<PagesAdmin />} /> */}

            <Route path="*" element={<PagesNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Routing;
