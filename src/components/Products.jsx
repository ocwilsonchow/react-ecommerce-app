import React, { useState, useEffect } from 'react';
import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  Spinner,
  useColorModeValue,
  Code,
  IconButton,
  HStack,
  Container,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { useShop } from '../contexts/ShopContext';

const Products = () => {
  const { getProducts, products, increaseProductStock, decreaseProductStock } =
    useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Flex flexWrap="wrap" justifyContent="center" w="100%" overflow="auto">
      {products?.map(product => (
        <Box
          key={product.id}
          flexDir="column"
          p={3}
          m={2}
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
          <Flex justifyContent="space-between">
            <Badge mt={3} fontSize="xs">
              {product.category}
            </Badge>
            {product.stock > 0 ? (
              <Badge mt={3} fontSize="xs" colorScheme="orange">
                In stock
              </Badge>
            ) : (
              <Badge mt={3} fontSize="xs" colorScheme="">
                Out of Stock
              </Badge>
            )}
          </Flex>
          <Text mt={2} fontWeight="bold">
            {product.name}
          </Text>
          <Flex>
            <Text fontWeight="light">HKD {product.price}</Text>
          </Flex>

          <IconButton
            mt={2}
            borderRadius="50%"
            disabled={loading || product.stock == 0}
            icon={<AddIcon boxSize={3} />}
            value={product.id}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default Products;
