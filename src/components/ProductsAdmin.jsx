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
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { useShop } from '../contexts/ShopContext';

const ProductsAdmin = () => {
  const { getProducts, products, increaseProductStock, decreaseProductStock } =
    useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const [loading, setLoading] = useState(false);

  return (
    <Flex flexWrap="wrap" justifyContent="center">
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
          <Flex justifyContent="space-between">
            <Badge mt={3} fontSize="xs">
              {product.category}
            </Badge>
            <Badge mt={3} fontSize="xs" colorScheme="orange">
              stock: {product.stock}
            </Badge>
          </Flex>
          <Text mt={2} fontWeight="bold">
            {product.name}
          </Text>
          <Flex>
            <Text fontWeight="light">HKD {product.price}</Text>
          </Flex>
          <Code fontSize="xs">{product.id}</Code>
          <HStack mt={3}>
            <IconButton
              disabled={loading || product.stock == 0}
              icon={<MinusIcon boxSize={3} />}
              value={product.id}
              onClick={e => {
                decreaseProductStock(e.target.value)
              }}
            />

            <IconButton
              disabled={loading}
              icon={<AddIcon boxSize={3} />}
              value={product.id}
              onClick={e => {
                increaseProductStock(e.target.value);
              }}
            />
          </HStack>
        </Box>
      ))}
    </Flex>
  );
};

export default ProductsAdmin;
