import React, { useEffect } from 'react';
import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  HStack,
  Center,
} from '@chakra-ui/react';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { useCart } from '../contexts/CartContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PagesQuery = () => {
  const {
    getProducts,
    getQueryProducts,
    queryProducts,
    updateQueryDisplayProducts,
    increasePageNumber,
    decreasePageNumber,
    pageNumber,
  } = useShop();
  const { createCartItem, createFavoriteItems } = useCart();

  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryHoverBgColor = useColorModeValue('orange.200', 'teal.700');

  useEffect(() => {
    if (!queryProducts) {
      getQueryProducts();
    }
  }, []);


  const handleCreateCartItem = product => {
    createCartItem(product);
  };

  return (
    <>
      <Center py={2}>
        <Text fontWeight="bold">There are {queryProducts.length} matched results: </Text>
        {queryProducts.length === 0 &&  <Text fontWeight="bold">There are no matched results</Text>}
      </Center>
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        w="100%"
        px="1rem"
        pb={10}
        position="relative"
      >
        {queryProducts?.map(product => (
          <Flex
            flexDir="column"
            p={3}
            m={2}
            key={product.id}
            bg={secondaryBgColor}
            _hover={{ bg: secondaryHoverBgColor }}
            cursor="pointer"
            transition="all ease 0.3s"
            borderRadius="1rem"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"

          >
            <Link to={`/product/${product.id}`}>
              <Image
                src={product.image}
                boxSize={{ base: '100%', sm: '100%', md: '210px' }}
                objectFit="cover"
                borderRadius="0.5rem"
              />
            </Link>
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

            <Link to={`/product/${product.id}`} key={product.id}>
              <Text mt={2} fontWeight="bold" isTruncated maxW="210px">
                {product.name}
              </Text>
            </Link>

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
                disabled={product.stock === 0}
                icon={<MdShoppingCart />}
                variant="outline"
                onClick={() => handleCreateCartItem(product)}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default PagesQuery;
