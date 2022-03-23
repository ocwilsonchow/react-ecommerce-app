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
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

import { useShop } from '../contexts/ShopContext';

const ProductsAdmin = () => {
  const {
    getProducts,
    products,
    increaseProductStock,
    decreaseProductStock,
    deleteProduct,
  } = useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryHoverBgColor = useColorModeValue('teal.200', 'teal.700');

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

          _hover={{ bg: secondaryHoverBgColor }}
          transition="all ease 0.3s"
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
          <Tooltip label={product.name}>
            <Text mt={2} fontWeight="bold" isTruncated maxW="200px">
              {product.name}
            </Text>
          </Tooltip>
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
                decreaseProductStock(e.target.value);
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
            <IconButton
              disabled={loading}
              icon={<DeleteIcon boxSize={3} />}
              onClick={() => {
                deleteProduct(product.id);
              }}
            />
          </HStack>
        </Box>
      ))}
    </Flex>
  );
};

export default ProductsAdmin;
