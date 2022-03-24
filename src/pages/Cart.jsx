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
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { MinusIcon, AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';

const PagesCart = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48');
  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');
  const {
    cartItems,
    getCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCart();
  const { user } = useAuth();

  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <VStack w="100%">
        <Text fontWeight="bold" fontSize="2xl" my={5}>
          Cart
        </Text>
      </VStack>

      <VStack alignItems="center" minW="350px" maxW="700px" spacing="15px">
        {cartItems.map(item => (
          <Flex
            key={item.id}
            bg={tertiaryBgColor}
            p={2}
            w="100%"
            borderRadius="1rem"
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

            <Flex alignItems="center" justifyContent="space-between" w="100%">
              <Image
                boxSize="5rem"
                src={item.productImageURL}
                borderRadius="0.5rem"
                mr={2}
              />

              <Flex w="100%" justifyContent="space-between" alignItems="center">
                <Flex flexDir="column" px={2}>
                  <Tooltip label={item.productName}>
                    <Text color="white" fontWeight="bold">
                      {item.productName}
                    </Text>
                  </Tooltip>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      HKD {item.price}
                    </Text>
                  </HStack>
                </Flex>
                <Flex>
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
            </Flex>
          </Flex>
        ))}
        <Center py={10}>
          <Button disabled={!user}> {cartItems.length == 0 && 'Please login to view your shopping cart.' || "Go to Payment"}</Button>
        </Center>
      </VStack>
    </Flex>
  );
};

export default PagesCart;
