import React, { useEffect } from 'react';
import { Center, Flex, Text, VStack } from '@chakra-ui/layout';
import TransactionHistory from '../components/TransactionHistory';

const PagesCheckoutSuccess = () => {
  return (
    <Flex w="100%">
      <VStack w="100%">
        <Text py={10} fontWeight="bold" fontSize="2xl">
          Checkout Succeeded
        </Text>
        <Text py={2} fontWeight="light" fontSize="lg">
          Thank you for your purchase!
        </Text>
        <TransactionHistory />
      </VStack>
    </Flex>
  );
};

export default PagesCheckoutSuccess;
