import React, { useState, useRef, useEffect } from 'react';
import { Badge, Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';

const Products = () => {
  const { getProducts, products } = useShop();
  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {products?.map(product => (
        <Box flexDir="column" p={3} m={1} bg="teal" borderRadius="1rem" >
          <Image src={product.image} boxSize="200px" objectFit="cover" borderRadius="0.5rem"/>
          <Badge mt={2} fontSize="xs">{product.category}</Badge>
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
