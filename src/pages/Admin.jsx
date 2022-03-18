import React, { useEffect } from 'react';
import { Flex, Text, useColorModeValue, FormControl, Input, FormLabel } from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';
import CreateProduct from '../components/CreateProduct';

const PagesAdmin = () => {
  const bgColor = useColorModeValue('#F4F4F4', '#161633');
  const { getCategories, categories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex bg={bgColor} w="100%">
      <CreateProduct />
    </Flex>
  );
};

export default PagesAdmin;
