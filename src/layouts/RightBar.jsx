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
  Badge,
  Avatar,
  HStack,
  useColorModeValue,
  IconButton,
  Circle,
  Checkbox,
  Tooltip,
  Tag,
} from '@chakra-ui/react';
import { getDoc } from 'firebase/firestore';
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const { user } = useAuth();
  const {
    cartItems,
    getCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCart();

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
      justifyContent="space-between"
    >
      {/* Search Bar + Avatar */}
      <Flex flexDir="column" alignItems="center">
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
        </Flex>
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
        <Flex flexDir="column" my={3} w="85%">
          <Text fontWeight="bold" my={2}>
            My Shopping Cart
          </Text>

          {/* From firestore */}
          {cartItems.length == 0 && <Text my={2}>Your cart has no item.</Text>}
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
            >
              <Tag
                justifyContent="center"
                alignItems="center"
                colorScheme="twitter"
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
                  <IconButton
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
            colorScheme="twitter"
            fontWeight="bold"
            disabled={cartItems.length == 0}
          >
            Check Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightBar;
