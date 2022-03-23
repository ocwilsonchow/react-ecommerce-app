import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Center,
  useColorModeValue,
  Image,
  HStack,
  Spinner,
  Button,
  Badge,
  Tag,
  Box,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';

import { useShop } from '../contexts/ShopContext';
import { useCart } from '../contexts/CartContext';

import Categories from '../components/Categories';
import SuggestedProducts from '../components/SuggestedProducts';

const PagesShow = () => {
  const bgColor = useColorModeValue('#f5f5f5', '#13031F');
  const { product, getProduct } = useShop();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { createCartItem } = useCart();

  useEffect(() => {
    getProduct(id);
    setLoading(false);
  }, []);

  return (
    <Flex
      flexDir="column"
      bg={bgColor}
      w="100%"
      h="100vh"
      overflow="auto"
      alignItems="center"
    >
      <Categories />
      <VStack justifyContent="space-between" h="100%" py={6}>
        {product && (
          <Flex
            p={2}
            w="100%"
            flexDir={{ base: 'column', sm: 'column', md: 'row' }}
            justifyContent="center"
            alignItems={{ sm: 'center', md: 'flex-start' }}

          >
            {(loading && <Spinner size="xl" />) || (
              <Image
                boxSize={['100%', '70%', 'xs', '350px']}
                src={product?.image}
                objectFit="cover"
                borderRadius="1rem"
                mb={5}
              />
            )}
            <Flex
              flexDir="column"
              px={10}
              maxW="700px"
              justifyContent="space-between"
            >
              <Flex flexDir="column">
                <Text fontWeight="bold" fontSize="3xl" mx={4}>
                  {product?.name}
                </Text>
                <HStack mx={4} mt={2}>
                  <Badge fontSize="sm" colorScheme="twitter">
                    {product?.category}
                  </Badge>
                  {product?.stock > 0 ? (
                    <Badge fontSize="sm" colorScheme="orange">
                      In stock
                    </Badge>
                  ) : (
                    <Badge fontSize="sm" colorScheme="">
                      Out of Stock
                    </Badge>
                  )}
                </HStack>
              </Flex>
              <Text m={4}>
                {product?.description ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
              </Text>
              <Text m={4} fontSize="xl" fontWeight="medium">
                HKD {product?.price}
              </Text>
              <Flex mx={3}>
                <IconButton
                  mt={1}
                  mx={1}
                  size="lg"
                  borderRadius="50%"
                  icon={<MdFavorite />}
                  variant="outline"
                />
                <IconButton
                  mt={1}
                  mx={1}
                  size="lg"
                  borderRadius="50%"
                  disabled={product?.stock == 0}
                  colorScheme="twitter"
                  icon={<MdShoppingCart />}
                  onClick={() => createCartItem(product)}
                />
              </Flex>
            </Flex>
          </Flex>
        )}
        {product && <SuggestedProducts productCategory={product.category} />}
      </VStack>
    </Flex>
  );
};

export default PagesShow;
