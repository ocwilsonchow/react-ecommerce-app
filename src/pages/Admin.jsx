import React, { useEffect } from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { useCategories } from '../contexts/CategoriesContext';

const PagesAdmin = () => {
  const bgColor = useColorModeValue('#F4F4F4', '#161633');
  const { getCategories } = useCategories();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex bg={bgColor} w="100%">
      <Flex p={5} >
        <Text fontWeight="bold">Create New Product</Text>
      </Flex>
    </Flex>
  );
};

export default PagesAdmin;
