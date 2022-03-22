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
  Avatar,
  HStack,
  useColorModeValue,
  IconButton,
  Circle,
  Checkbox,
  Tooltip,
} from '@chakra-ui/react';
import { getDoc } from 'firebase/firestore';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const { user } = useAuth();
  const { cartItems, getCart } = useCart();

  const cartFItems = [
    {
      name: 'Item One',
      price: '590',
      currency: 'HKD',
      id: 1,
      imgURL:
        'https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg',
    },
  ];

  useEffect(() => {
    getCart();
    console.log(cartItems);
  }, [user]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      bg={bgColor}
      h="100%"
      overflow="auto"
    >
      {/* Search Bar + Avatar */}
      <Flex
        w="85%"
        py={2}
        mt={4}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Input
          bg={secondaryBgColor}
          border="none"
          borderRadius="1rem"
          mr={5}
          placeholder="Search"
        />

        {user?.photoURL && <Avatar src={user.photoURL} />}
        <Avatar bg="teal.500" />
      </Flex>

      {/* Gadget Box */}
      <Flex
        bg={secondaryBgColor}
        w="85%"
        p={5}
        h="230px"
        borderRadius="1rem"
        m={2}
      >
        {user && (
          <Flex flexDir="column">
            <Input placeholder={user?.displayName} variant="flushed" />
            <Input placeholder={user?.email} variant="flushed" />
            <Text mt={2} fontSize="xs">
              Email verified: {(user.emailVerified && 'Yes') || 'Not yet'}
            </Text>
            <Text mt={2} fontSize="xs">
              {user.uid}
            </Text>
            <Button mt={4}>Update Profile</Button>
          </Flex>
        )}
      </Flex>

      <Flex flexDir="column" alignItems="center" w="100%" overflow="auto">
        {/* Shopping Cart */}
        <Flex flexDir="column" my={3} w="85%">
          <Text fontWeight="bold" my={2}>
            My Shopping Cart
          </Text>

          {/* From firestore */}
          {cartItems.map(item => (
            <Box
              key={item.productId}
              bg={tertiaryBgColor}
              p={2}
              borderRadius="1rem"
              my={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Image
                  boxSize="50px"
                  src={item.productImageURL}
                  borderRadius="0.5rem"
                  mr={3}
                />
                <Flex flexDir="column">
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
            <HStack>
                <IconButton borderRadius="50%" size="xs" icon={<MinusIcon />} />
                <IconButton borderRadius="50%" size="xs" icon={<AddIcon />} />
              </HStack>
              </Flex>
            </Box>
          ))}
        </Flex>

        {/* Checkout button */}
        <Flex justifyContent="center" w="100%">
          <Button
            size="lg"
            w="85%"
            my={3}
            color="white"
            fontWeight="bold"
            bgGradient="linear(to-r, #7192E2, #3961C3)"
          >
            Check Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightBar;
