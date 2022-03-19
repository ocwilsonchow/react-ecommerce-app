import React, { useState, useRef, useEffect } from 'react';
import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Spinner,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';

const Products = () => {
  const { getProducts, products } = useShop();
    const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {products?.map((product) => (
        <Box
          key={product.id}
          flexDir="column"
          p={3}
          m={1}
          bg={secondaryBgColor}
          borderRadius="1rem"
        >
          {!product.image && <Spinner />}
          <Image
            src={product.image}
            boxSize="200px"
            objectFit="cover"
            borderRadius="0.5rem"
          />
          <Badge mt={2} fontSize="xs">
            {product.category}
          </Badge>
          <Text fontWeight="bold">{product.name}</Text>
          <Flex>
            <Text fontWeight="light">HKD {product.price}</Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default Products;
