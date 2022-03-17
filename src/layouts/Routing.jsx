import React from 'react';
import { Routes, BrowserRouter, Route, Router } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';

import PagesHome from '../pages/Home';
import PagesCategories from '../pages/Categories';
import PagesNotFound from '../pages/NotFound';
import App from '../layouts/App';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PagesHome />} />
          <Route path="/categories" element={<PagesCategories />} />

          <Route path="*" element={<PagesNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
