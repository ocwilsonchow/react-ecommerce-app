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
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import { useCart } from '../contexts/CartContext';
import { MdShoppingCart } from 'react-icons/md';

const PagesFavorites = () => {
  const { favoriteItems, removeFavoriteItem, createCartItem } = useCart();
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
      <Flex w="100%" justifyContent="center">
        <VStack
          mx={2}
          alignItems="center"
          minW="350px"
          maxW="700px"
          spacing="15px"
          p={4}
          mb={8}
          bg={bgColor}
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
            <Flex
              bg={tertiaryBgColor}
              p={3}
              w="100%"
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
              <Flex
                alignItems="center"
                justifyContent="space-between"
                w="100%"
              >
                <Image
                  boxSize="80px"
                  src={item.productImageURL}
                  borderRadius="0.5rem"
                  mr={2}
                />

                <Flex w="100%" justifyContent="space-between">
                  <Link to={`/product/${item.productId}`}>
                  <Flex flexDir="column" w="100%" px={1}>
                    <HStack>
                      <Tooltip label={item.productName}>
                        <Text
                          color="white"
                          fontWeight="bold"
                          display="flex"
                          flexWrap="wrap"
                        >
                          {item.productName}
                        </Text>
                      </Tooltip>
                    </HStack>
                    <HStack>
                      <Text color="white" fontWeight="light">
                        HKD {item.price}
                      </Text>
                    </HStack>
                  </Flex>
                </Link>
                <Flex>
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
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default PagesFavorites;
