import React from 'react';
import { Center, Flex, Text, VStack } from '@chakra-ui/layout';

const PagesCheckoutSuccess = () => {
  return (
    <Flex w="100%">
      <VStack
       w="100%">
        <Text py={10} fontWeight="bold" fontSize="2xl">
          Checkout Succeeded
        </Text>
        <Text py={2} fontWeight="light" fontSize="lg">
          Thank you for your purchase!
        </Text>
      </VStack>
    </Flex>
  );
};

export default PagesCheckoutSuccess;
