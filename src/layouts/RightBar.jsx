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
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { MinusIcon, AddIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import CartTotal from '../components/CartTotal';

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
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
              colorScheme="twitter"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Not signed in{' '}
            </Tag>
          )}
          {user?.isAnonymous && (
            <Tag
              colorScheme="twitter"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Signed in as: Guest{' '}
            </Tag>
          )}
          {user && !user?.isAnonymous && (
            <Tag
              colorScheme="twitter"
              fontSize="xs"
              display={{ md: 'none', lg: 'flex' }}
            >
              Signed in as: {user.displayName}{' '}
            </Tag>
          )}
          <Avatar size="md" src={user?.photoURL || ''} />
        </Flex>

        {/* Gadget Box */}
        <Flex
          bg={secondaryBgColor}
          w="90%"
          p={5}
          h="150px"
          borderRadius="1rem"
          m={2}
          display={{ md: 'none', lg: 'block' }}
        ></Flex>
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
          {user && (
            <Text fontWeight="bold" w="100%" p={2}>
              My Cart
            </Text>
          )}
          <Flex flexDir="column" pb={3} w="100%" alignItems="center">
            {user && cartItems.length === 0 && (
              <Text my={1} px={2} fontWeight="light">
                Cart is empty
              </Text>
            )}
            {cartItems.map(item => (
              <Box
                bg={tertiaryBgColor}
                p={2}
                borderRadius="1rem"
                my={1}
                alignItems="center"
                justifyContent="space-between"
                position="relative"
                _hover={{ bg: secondaryHoverBgColor }}
                transition="all ease 0.3s"
                cursor="pointer"
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
                  <Link to={`/product/${item.productId}`} key={item.id}>
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

          {user && (
            <Text w="100%" p={2} fontWeight="bold" isTruncated>
              Favorites
            </Text>
          )}
          <Flex flexDir="column" w="100%" alignItems="center">
            {user && favoriteItems.length === 0 && (
              <Text my={1} px={2} fontWeight="light">
                No item in Favorites
              </Text>
            )}
            {favoriteItems?.map(item => (
              <Box
                bg={tertiaryBgColor}
                p={2}
                borderRadius="1rem"
                my={1}
                alignItems="center"
                justifyContent="space-between"
                position="relative"
                _hover={{ bg: secondaryHoverBgColor }}
                transition="all ease 0.3s"
                cursor="pointer"
                key={item.id}
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
              fontSize="md"
              w="100%"
              my={1}
              colorScheme="twitter"
              fontWeight="bold"
              hidden={cartItems.length === 0}
              display={{ md: 'none', lg: 'block' }}
            >
              Proceed to Checkout
            </Button>
          </Link>
          {!user ||
            (user?.isAnonymous && (
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
            ))}
          {!user && (
            <Button
              mt={2}
              size="lg"
              onClick={() => anonymousLogin()}
              display={{ md: 'none', lg: 'flex' }}
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
