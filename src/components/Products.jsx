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
  Center,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';

import { useShop } from '../contexts/ShopContext';
import { useCart } from '../contexts/CartContext';
import Banner from '../components/Banner'


const Products = () => {
  const { getProducts, products } = useShop();
  const { createCartItem, getCart, cartItems } = useCart();

  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Flex flexWrap="wrap" justifyContent="center" w="100%" overflow="auto">
     <Banner />
      {products?.map(product => (
        <Box
          key={product.id}
          flexDir="column"
          p={3}
          m={2}
          bg={secondaryBgColor}
          borderRadius="1rem"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
        >
          {!product.image && <Spinner />}
          <Image
            src={product.image}
            boxSize="200px"
            objectFit="cover"
            borderRadius="0.5rem"
          />
          <Tooltip label={product.id}>
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
          </Tooltip>

          <Text mt={2} fontWeight="bold" isTruncated>
            {product.name}
          </Text>
          <Flex>
            <Text fontWeight="light">HKD {product.price}</Text>
          </Flex>

          <Flex justifyContent="flex-end">
            <IconButton
              mt={1}
              mx={1}
              size="md"
              borderRadius="50%"
              icon={<MdFavorite />}
            />
            <IconButton
              mt={1}
              mx={1}
              size="md"
              borderRadius="50%"
              disabled={product.stock == 0}
              icon={<MdShoppingCart />}
              onClick={() => createCartItem(product)}
            />
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default Products;
