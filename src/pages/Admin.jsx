import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  useColorModeValue,
  FormControl,
  Input,
  FormLabel,
  Badge,
} from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';
import CreateProduct from '../components/CreateProduct';

const PagesAdmin = () => {
  const { getCategories, categories } = useShop();

  useEffect(() => {
    if (!categories) {
       getCategories();
    }
  }, []);

  return (
    <Flex w="100%"  overflow="auto" position="relative">
      <CreateProduct />
    </Flex>
  );
};

export default PagesAdmin;
