import React, { useEffect } from 'react';
import { Button, Center, Flex, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PagesCheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <Flex w="100%">
      <VStack w="100%" py={10}>
        <Text fontWeight="bold" fontSize="4xl" textAlign="center">
          Checkout Succeeded!
        </Text>
        <Text py={2} fontWeight="light" fontSize="lg" textAlign="center">
          Thank you for your purchase!
        </Text>
        <Flex flexDir="column" py={10}>
          <Button onClick={() => navigate('/my/order')} mb={3} colorScheme="teal">
            View Order History
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">Go to Home Page</Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default PagesCheckoutSuccess;
