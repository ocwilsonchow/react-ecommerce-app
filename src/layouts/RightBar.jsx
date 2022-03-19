import React from 'react';
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
} from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const { user } = useAuth();
  const { createCart } = useCart()

  const cartItems = [
    {
      name: 'Item One',
      price: '590',
      currency: 'HKD',
      id: 1,
      imgURL:
        'https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg',
    },
  ];

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
            <Input value={user?.displayName } placeholder="Username" variant="flushed" />
            <Input value={user?.email } placeholder="Username" variant="flushed" />
            <Text mt={2} fontSize="xs">
              Email verified:{" "} {(user.emailVerified && 'Yes') || 'Not yet'}
            </Text>
            <Text  mt={2} fontSize="xs">
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
          <Button onClick={createCart} disabled={!user}>Create Cart</Button>
          {/* For testing only */}
          {cartItems.map(item => (
            <Flex
              key={item.id}
              bg={tertiaryBgColor}
              p={2}
              borderRadius="1rem"
              my={5}
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex>
                <Image
                  width="50px"
                  height="50px"
                  src={item.imgURL}
                  borderRadius="1rem"
                  mr={5}
                />
                <Flex flexDir="column">
                  <Text color="white" fontWeight="bold">
                    {item.name}
                  </Text>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      {item.currency} {item.price}
                    </Text>
                  </HStack>
                </Flex>
              </Flex>
              <HStack>
                <IconButton borderRadius="50%" size="xs" icon={<MinusIcon />} />
                <IconButton borderRadius="50%" size="xs" icon={<AddIcon />} />
              </HStack>
            </Flex>
          ))}
        </Flex>

        {/* Hot Add-on */}
        <Flex flexDir="column" my={3} w="85%">
          <Text fontWeight="bold" my={2}>
            My Favorites
          </Text>
          <Flex
            bg={tertiaryBgColor}
            p={2}
            borderRadius="1rem"
            my={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <Image
                width="50px"
                height="50px"
                src="https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg"
                borderRadius="1rem"
                mr={5}
              />
              <Flex flexDir="column">
                <Text color="white" fontWeight="bold">
                  Item
                </Text>
                <HStack>
                  <Text color="white">HKD 900</Text>
                </HStack>
              </Flex>
            </Flex>
             <HStack>
                <IconButton borderRadius="50%" size="xs" icon={<MinusIcon />} />
                <IconButton borderRadius="50%" size="xs" icon={<AddIcon />} />
              </HStack>
          </Flex>
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
