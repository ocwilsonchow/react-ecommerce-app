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
  const { getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex w="100%" h="100vh" overflow="auto" position="relative">
      <Badge
        position="absolute"
        top="2rem"
        left="2rem"
        fontWeight="bold"
        fontSize="sm"
        colorScheme="pink"
      >
        Admin
      </Badge>
      <CreateProduct />
    </Flex>
  );
};

export default PagesAdmin;
