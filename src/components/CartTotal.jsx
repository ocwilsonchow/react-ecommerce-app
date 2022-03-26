import React, { useEffect } from 'react';
import { Flex, Center, Text } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

const CartTotal = () => {
  const { cartTotal } = useCart();

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      px={2}
      mb={2}
      flexWrap="wrap"
      alignItems="center"
      textAlign="center"
    >
      <Center w="100%">
        <Text
          fontWeight="bold"
          fontSize={{ md: 'sm', lg: 'md' }}
          textAlign="center"
        >
          Total:
        </Text>
      </Center>
      <Center w="100%">
        <Text
          fontWeight="bold"
          alignItems="center"
          fontSize={{ md: 'sm', lg: 'md' }}
          textAlign="center"
        >
          HKD {cartTotal}
        </Text>
      </Center>
    </Flex>
  );
};

export default CartTotal;
