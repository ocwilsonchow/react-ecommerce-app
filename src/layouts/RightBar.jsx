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
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCart();
      getFavorites();
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
          justifyContent="space-between"
        >
          {!user && (
            <Tag fontSize="xs" display={{ md: 'none', lg: 'flex' }}>
              Not signed in{' '}
            </Tag>
          )}
          {user?.isAnonymous && (
            <Tag fontSize="xs" display={{ md: 'none', lg: 'flex' }}>
              Signed in as: Guest{' '}
            </Tag>
          )}
          {user && !user?.isAnonymous && (
            <Tag fontSize="xs" display={{ md: 'none', lg: 'flex' }}>
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
        <Flex flexDir="column" my={3} alignItems="center">
          {/* Shopping cart item*/}
          {user && cartItems.length === 0 && (
            <>
              <Flex w="100%" justifyContent="center">
                <Text
                  fontWeight="bold"
                  my={2}
                  display={{ md: 'none', lg: 'flex' }}
                >
                  My Shopping Cart
                </Text>
              </Flex>
              <Text my={1} fontWeight="light" textAlign="center">
                Cart is empty
              </Text>
            </>
          )}
          {!user && (
            <Button my={4} onClick={() => anonymousLogin()}>
              Continue as Guest
            </Button>
          )}
          <Text fontWeight="bold" w="100%" py={2}>My Cart</Text>
          <Flex flexDir="column" pb={3}>
            {cartItems.map(item => (
            <Box
              key={item.id}
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

                <Flex
                  flexDir="column"
                  px={2}
                  display={{ md: 'none', lg: 'block' }}
                >
                  <Tooltip label={item.productName}>
                    <Text color="white" fontWeight="bold" w="120px" isTruncated>
                      {item.productName}
                    </Text>
                  </Tooltip>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      HKD {item.price}
                    </Text>
                  </HStack>
                </Flex>
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

          <Text w="100%" py={2} fontWeight="bold">My Favorites</Text>
          {favoriteItems?.map(item => (
            <Box
              key={item.id}
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
              <Flex alignItems="center" justifyContent="space-between">
                <Image
                  boxSize="50px"
                  src={item.productImageURL}
                  borderRadius="0.5rem"
                />

                <Flex
                  flexDir="column"
                  px={2}
                  display={{ md: 'none', lg: 'block' }}
                >
                  <Tooltip label={item.productName}>
                    <Text color="white" fontWeight="bold" w="140px" isTruncated>
                      {item.productName}
                    </Text>
                  </Tooltip>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      HKD {item.price}
                    </Text>
                  </HStack>
                </Flex>
                <Flex display={{ md: 'none', lg: 'block' }}>
                  <IconButton
                    mt={1}
                    mx={1}
                    size="xs"
                    borderRadius="50%"

                    icon={<CloseIcon boxSize="0.5rem"/>}
                    onClick={() => removeFavoriteItem(item)}
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>

        {/* Checkout button */}
        <Flex flexDir="column" justifyContent="center" w="90%">
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
          {!user && (
            <Button
              w="100%"
              size="lg"
              my={1}
              colorScheme="gray"
              fontWeight="bold"
              display={{ md: 'none', lg: 'block' }}
              onClick={() => navigate('/auth')}
            >
              Log in
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
