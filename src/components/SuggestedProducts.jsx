import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  Badge,
  Image,
  IconButton,
  Tooltip,
  useColorModeValue,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';

import { useShop } from '../contexts/ShopContext';
import { useCart } from '../contexts/CartContext';

const SuggestedProducts = productCategory => {
  const { getSimilarProducts, similarProducts } = useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const { createCartItem, createFavoriteItems } = useCart();
  const secondaryHoverBgColor = useColorModeValue('teal.200', 'teal.700');

  useEffect(() => {
    getSimilarProducts(productCategory);
  }, []);

  return (
    <VStack p={5} py={4}>
      <Text fontWeight="bold" fontSize="xl" my={5}>
        You may also like
      </Text>

      <Flex flexWrap="wrap" w="100%" justifyContent="center">
        {similarProducts?.map(product => (
          <Flex
            flexDir="column"
            p={3}
            mx={2}
            my={2}
            bg={secondaryBgColor}
            cursor="pointer"
            _hover={{ bg: secondaryHoverBgColor, transform: "scale(1.05)" } }
            transition="all ease 0.5s"
            borderRadius="1rem"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
            key={product.id}
          >
            <Flex justifyContent="center">
              <Link to={`/product/${product.id}`} >
                {' '}
                <Image
                  src={product.image}
                  boxSize={{ base: '100%', sm: '100%', md: '200px' }}
                  objectFit="cover"
                  borderRadius="0.5rem"
                />
              </Link>
            </Flex>

            <Tooltip label={product.id}>
              <Flex flexWrap="wrap" justifyContent="space-between">
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

            <Tooltip label={product.name}>
              <Link to={`/product/${product.id}`} key={product.id}>
                <Text mt={2} fontWeight="bold" isTruncated maxW="180px">
                  {product.name}
                </Text>
              </Link>
            </Tooltip>
            <Flex>
              <Text fontWeight="light">HKD {product.price}</Text>
            </Flex>

            <Flex justifyContent="flex-end">
              <IconButton
                mt={1}
                mx={1}
                size="md"
                borderRadius="50%"
                variant="outline"
                icon={<MdFavorite />}
                 onClick={() => createFavoriteItems(product)}
              />
              <IconButton
                mt={1}
                mx={1}
                size="md"
                borderRadius="50%"
                disabled={product.stock == 0}
                icon={<MdShoppingCart />}
                variant="outline"
                onClick={() => createCartItem(product)}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};

export default SuggestedProducts;
