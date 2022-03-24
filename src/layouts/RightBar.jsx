import React, { useEffect } from 'react';
import {
  Center,
  Box,
  Image,
  Flex,
  VStack,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Avatar,
  HStack,
  useColorModeValue,
  IconButton,
  Circle,
  Checkbox,
  Tooltip,
  Tag,
  Fade,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { MinusIcon, AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');

  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const { user } = useAuth();
  const {
    cartItems,
    getCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCart();
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
          w="85%"
          py={2}
          mt={4}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <InputGroup display={{ md: 'none', lg: 'flex' }}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              variant="outline"
              borderRadius="full"
              mr={3}
              placeholder="Search"
            />
          </InputGroup>

          {user?.photoURL && <Avatar src={user.photoURL} />}
          <Avatar size="md" />
        </Flex>

        {/* Gadget Box */}
        <Flex
          bg={secondaryBgColor}
          w="85%"
          p={5}
          h="230px"
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
        <Flex flexDir="column" my={3} >
          <Flex w="100%">
            <Text fontWeight="bold" my={2} display={{ md: 'none', lg: 'flex' }}>
            My Shopping Cart
          </Text>
          </Flex>
          {/* Shopping cart item*/}
          {cartItems.length == 0 && (
            <Text my={1} fontWeight="light" textAlign="center">
              Cart is empty
            </Text>
          )}
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
                colorScheme={item.quantity !== 0 && "twitter" || "red"}
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

        {/* Checkout button */}
        <Flex
          flexDir="column"

          justifyContent="center"
          w="85%"
        >
          <Link to="/checkout">
            <Button
            size="lg"
            w="100%"
            my={1}
            colorScheme="twitter"
            fontWeight="bold"
            hidden={cartItems.length == 0}
            display={{ md: 'none', lg: 'block' }}
          >
            Check Out
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
          <IconButton
            icon={<MdShoppingCart />}
            display={{ md: 'flex', lg: 'none' }}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightBar;
