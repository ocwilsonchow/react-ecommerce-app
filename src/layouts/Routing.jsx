import React from 'react';
import { Routes, BrowserRouter, Route, Router } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';

import App from '../layouts/App';
import { AuthProvider } from '../contexts/AuthContext';
import { ShopProvider } from '../contexts/ShopContext';
import { CartProvider } from '../contexts/CartContext';

import PagesNotFound from '../pages/NotFound';

import PagesHome from '../pages/Home';
import PagesAuth from '../pages/Auth';
import PagesCategories from '../pages/Categories';
import PagesAdmin from '../pages/Admin';
import PagesShow from '../pages/Show';

function Routing() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ShopProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<PagesHome />} />
                  <Route path="/auth" element={<PagesAuth />} />
                  <Route path="/categories" element={<PagesCategories />} />
                  <Route path="/product/:id" element={<PagesShow />} />
                  <Route path="/admin/stockmanagement" element={<PagesAdmin />}/>

                  <Route path="*" element={<PagesNotFound />} />
                </Route>
              </Routes>
            </CartProvider>
          </ShopProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default Routing;
