import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  HStack,
  VStack,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { MdShoppingCart } from 'react-icons/md';

const PagesFavorites = () => {
  const { favoriteItems, removeFavoriteItem, products, createCartItem } =
    useCart();
  const { user } = useAuth();
  const bgColor = useColorModeValue('#FFFFFF', '#141026');

  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');

  const handleCreateCartItem = product => {
    createCartItem(product);
  };

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <VStack w="100%">
        <Text fontWeight="bold" fontSize="2xl" my={5}>
          Favorites
        </Text>
      </VStack>
      <VStack
        alignItems="center"
        bg={bgColor}
        minW="350px"
        maxW="700px"
        p={4}
        spacing="15px"
        borderRadius="xl"
      >
        {favoriteItems.length === 0 && (
          <>
            <Text my={1} px={2} textAlign="center">
              No item in Favorites
            </Text>
            <Link to="/">
              <Button>Go shopping now</Button>
            </Link>
          </>
        )}
        {favoriteItems?.map(item => (
          <Box
            bg={tertiaryBgColor}
            p={3}
            borderRadius="1rem"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            _hover={{ bg: secondaryHoverBgColor }}
            transition="all ease 0.3s"
            cursor="pointer"
            key={item.id}
            boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Image
                boxSize="80px"
                src={item.productImageURL}
                borderRadius="0.5rem"
                mr={2}
              />

              <Link to={`/product/${item.productId}`}>
                <Flex
                  flexDir="column"
                  px={2}
                  display={{ md: 'none', lg: 'block' }}
                >
                  <Tooltip label={item.productName}>
                    <Text color="white" fontWeight="bold" w="180px" isTruncated>
                      {item.productName}
                    </Text>
                  </Tooltip>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      HKD {item.price}
                    </Text>
                  </HStack>
                </Flex>
              </Link>
              <Flex display={{ md: 'none', lg: 'block' }}>
                <IconButton
                  mt={1}
                  mx={1}
                  size="sm"
                  borderRadius="50%"
                  icon={<CloseIcon boxSize="0.5rem" />}
                  onClick={() => removeFavoriteItem(item)}
                />
                <IconButton
                  mt={1}
                  mx={1}
                  size="sm"
                  borderRadius="50%"
                  disabled={item.stock === 0}
                  icon={<MdShoppingCart />}
                  onClick={() => handleCreateCartItem(item)}
                />
              </Flex>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default PagesFavorites;
