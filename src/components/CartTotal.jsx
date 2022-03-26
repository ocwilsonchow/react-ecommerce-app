import React, { useEffect } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

const CartTotal = () => {
  const { cartTotal } = useCart();

  return (

    <Flex w="100%" justifyContent="space-between" px={2} mb={2} flexWrap="wrap" alignItems="center">
      <Text w="100%" fontWeight="bold"  fontSize={{ md: 'sm', lg: 'xl' }} textAlign="center" >
        Total:
      </Text>
      <Text  w="100%" fontWeight="bold" display="flex" alignItems="center" fontSize={{ md: 'sm', lg: 'xl' }} textAlign="center">
        HKD {cartTotal}
      </Text>
    </Flex>
  );
};

export default CartTotal;
