import React from 'react';
import { Flex, VStack, useColorModeValue, Image } from '@chakra-ui/react';
import Products from '../components/Products';

const PagesHome = () => {
  return (
    <Flex flexDir="column" w="100%" h="100vh" overflow="auto">
      <Products />
    </Flex>
  );
};

export default PagesHome;
