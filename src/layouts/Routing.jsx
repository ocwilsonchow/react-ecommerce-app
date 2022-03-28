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
import PagesShowCategory from '../pages/Category'
import PagesCheckout from '../pages/Checkout'
import PagesCheckoutSuccess from '../pages/CheckoutSuccess'
import PagesCheckoutCanceled from '../pages/CheckoutCanceled'
import PagesMyAccount from '../pages/MyAccount'
import PagesFavorites from '../pages/Favorites'
import PagesQuery from '../pages/Query'
import PagesAbout from '../pages/About'

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
                  <Route path="/about" element={<PagesAbout />} />
                  <Route path="/categories" element={<PagesCategories />} />
                  <Route path="/categories/:id" element={<PagesShowCategory />} />
                  <Route path="/product/:id" element={<PagesShow />} />
                  <Route path="/products/query" element={<PagesQuery />} />
                  <Route path="/checkout" element={<PagesCheckout />} />
                  <Route path="/favorites" element={<PagesFavorites />} />
                  <Route path="/success" element={<PagesCheckoutSuccess />} />
                  <Route path="/canceled" element={<PagesCheckoutCanceled />} />
                  <Route path="/my/account" element={<PagesMyAccount />} />
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
