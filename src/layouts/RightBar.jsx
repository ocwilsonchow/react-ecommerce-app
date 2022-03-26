import React, { useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
  IconButton,
  Tooltip,
  Tag,
  scaleFadeConfig,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { MinusIcon, AddIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FaCartArrowDown, FaCcVisa } from 'react-icons/fa';

import CartTotal from '../components/CartTotal';

const RightBar = () => {
  const bgColor = useColorModeValue('#FFF', '#141026');
  const secondaryBgColor = useColorModeValue('#f5f5f5', '#13031F');
  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');

  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const { user, anonymousLogin } = useAuth();
  const {
    cartItems,
    getCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    favoriteItems,
    getFavorites,
    removeFavoriteItem,
    calculateCartTotal,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCart();
      getFavorites();
      calculateCartTotal();
    }
  }, [user]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      bg={bgColor}
      h="100%"
      w="100%"
      maxW="290px"
      overflow="auto"
      justifyContent="space-between"
    >
      {/* Search Bar + Avatar */}
      <Flex flexDir="column" alignItems="center" w="100%">
        <Flex
          w="90%"
          py={2}
          mt={4}
          alignItems="center"
          justifyContent={{ md: 'center', lg: 'space-between' }}
        >
          {!user && (
            <Tag
              colorScheme="none"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Not signed in{' '}
            </Tag>
          )}
          {user?.isAnonymous && (
            <Tag
              colorScheme="none"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Signed in as: Guest{' '}
            </Tag>
          )}
          {user && !user?.isAnonymous && (
            <Tag
              colorScheme="none"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Signed in as: {user.displayName}{' '}
            </Tag>
          )}
          <Avatar size="md" src={user?.photoURL || ''} />
        </Flex>

        {/* Gadget Box */}
        {/* <Flex
          w="90%"
          h="150px"
          borderRadius="1rem"
          m={2}
          display={{ md: 'none', lg: 'block' }}
          boxShadow="lg"
          bg={secondaryBgColor}
          transition="all ease 0.5s"
          _hover={{ boxShadow: "2xl", transform: "scale(1.04)", cursor: "pointer" }}
        >
          <Box
            w="100%"
            h="100%"
            backdropFilter="blur(10px)"
            borderRadius="1rem"
            position="relative"
          >
            <Text
              position="absolute"
              bottom="75%"
              left="10%"
              fontWeight="light"
              fontSize="xs"
            >
              Balance
            </Text>
            <Text
              position="absolute"
              bottom="55%"
              left="10%"
              fontWeight="bold"
              fontSize="lg"

            >
              $ 45,000
            </Text>
            <Text
              position="absolute"
              top="72%"
              left="10%"
              fontWeight="light"
              fontSize="xs"
            >
              **** **** 4242
            </Text>
            <Box position="absolute" bottom="12%" right="8%">
              <FaCcVisa size="30px" />
            </Box>
          </Box>
        </Flex> */}
      </Flex>

      <Flex
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="100%"
        pb={5}
        overflow="auto"
      >
        {/* Shopping Cart */}
        <Flex flexDir="column" w="95%" my={3} alignItems="center">
          {/* Shopping cart item*/}
          {!user && (
            <Button
              my={4}
              onClick={() => anonymousLogin()}
              display={{ md: 'flex', lg: 'none' }}
              size="xs"
            >
              Guest
            </Button>
          )}

          <Flex
            flexDir="column"
            pb={3}
            w="100%"
            alignItems="center"
            bg={secondaryBgColor}
            borderRadius="xl"
          >
           <Link to="/checkout">
              <Text
              textAlign="center"
              fontWeight="bold"
              w="100%"
              p={2}
              mt={2}
              transition="all ease 0.5s"
              _hover={{ color: 'teal.500' }}
            >
              My Cart
            </Text>
           </Link>
            {cartItems.length === 0 && (
              <Text my={1} px={2} textAlign="center">
                Cart is empty
              </Text>
            )}
            {cartItems.map(item => (
              <Box
                key={item.id}
                bg={tertiaryBgColor}
                p={2}
                borderRadius="1rem"
                my={1.5}
                alignItems="center"
                justifyContent="space-between"
                position="relative"
                _hover={{ bg: secondaryHoverBgColor }}
                transition="all ease 0.3s"
                cursor="pointer"
                boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
              >
                <Tag
                  justifyContent="center"
                  alignItems="center"
                  colorScheme={(item.quantity !== 0 && 'twitter') || 'red'}
                  fontWeight="extrabold"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  top="0px"
                  left="-5px"
                >
                  {item.quantity}
                </Tag>

                <Flex alignItems="center" justifyContent="space-between">
                  <Image
                    boxSize="50px"
                    src={item.productImageURL}
                    borderRadius="0.5rem"
                  />
                  <Link to={`/product/${item.productId}`}>
                    <Flex
                      flexDir="column"
                      px={2}
                      display={{ md: 'none', lg: 'block' }}
                    >
                      <Tooltip label={item.productName}>
                        <Text
                          color="white"
                          fontWeight="bold"
                          w="120px"
                          isTruncated
                        >
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
                      mr={1}
                      borderRadius="50%"
                      size="xs"
                      icon={
                        (item.quantity > 0 && <MinusIcon />) || <DeleteIcon />
                      }
                      onClick={() =>
                        decreaseCartItemQuantity(item.id, item.quantity)
                      }
                    />
                    <IconButton
                      borderRadius="50%"
                      size="xs"
                      icon={<AddIcon />}
                      onClick={() => increaseCartItemQuantity(item.id)}
                    />
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Flex>

          <Flex
            flexDir="column"
            w="100%"
            alignItems="center"
            bg={secondaryBgColor}
            borderRadius="xl"
            mt={3}
            pb={3}
          >
            <Link to="/favorites">
              <Text
                textAlign="center"
                w="100%"
                p={2}
                mt={2}
                fontWeight="bold"
                isTruncated
                transition="all ease 0.5s"
                _hover={{ color: 'teal.500' }}
              >
                Favorites
              </Text>
            </Link>
            {favoriteItems.length === 0 && (
              <Text mt={1} mb={4} px={2} textAlign="center">
                No item in Favorites
              </Text>
            )}
            {favoriteItems?.map(item => (
              <Box
                bg={tertiaryBgColor}
                p={2}
                borderRadius="1rem"
                my={1.5}
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
                    boxSize="50px"
                    src={item.productImageURL}
                    borderRadius="0.5rem"
                  />

                  <Link to={`/product/${item.productId}`}>
                    <Flex
                      flexDir="column"
                      px={2}
                      display={{ md: 'none', lg: 'block' }}
                    >
                      <Tooltip label={item.productName}>
                        <Text
                          color="white"
                          fontWeight="bold"
                          w="140px"
                          isTruncated
                        >
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
                      size="xs"
                      borderRadius="50%"
                      icon={<CloseIcon boxSize="0.5rem" />}
                      onClick={() => removeFavoriteItem(item)}
                    />
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* Checkout button */}
        <Flex flexDir="column" justifyContent="center" w="90%">
          <CartTotal />
          <Link to="/checkout">
            <Button
              position="relative"
              size="lg"
              w="100%"
              my={1}
              colorScheme="linkedin"
              fontWeight="bold"
              hidden={cartItems.length === 0}
              display={{ md: 'none', lg: 'block' }}
              boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
            >
              Proceed to Checkout
            </Button>
          </Link>
          {!user && (
            <Button
              w="100%"
              size="lg"
              my={1}
              colorScheme="twitter"
              fontWeight="bold"
              display={{ md: 'none', lg: 'block' }}
              onClick={() => navigate('/auth')}
            >
              Log in
            </Button>
          )}
          {user?.isAnonymous && (
            <Button
              w="100%"
              size="lg"
              my={1}
              variant="outline"
              fontWeight="bold"
              display={{ md: 'none', lg: 'block' }}
              onClick={() => navigate('/auth')}
            >
              Log in
            </Button>
          )}
          {!user && (
            <Button
              mt={2}
              size="lg"
              onClick={() => anonymousLogin()}
              display={{ md: 'none', lg: 'flex' }}
              variant="outline"
            >
              Continue as Guest
            </Button>
          )}

          <Link to="/checkout">
            <Box
              position="relative"
              display={{ md: 'flex', lg: 'none' }}
              alignItems="center"
              justifyContent="center"
            >
              {user && (
                <Tag
                  justifyContent="center"
                  alignItems="center"
                  colorScheme="twitter"
                  fontWeight="extrabold"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  top="0.5rem"
                  right="15px"
                  fontSize="xs"
                >
                  {cartItems && cartItems.length}
                </Tag>
              )}
              <IconButton
                variant="ghost"
                borderRadius="50%"
                size="lg"
                my={2}
                icon={<FaCartArrowDown />}
              />
            </Box>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightBar;
