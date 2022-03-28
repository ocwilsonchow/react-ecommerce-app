import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  VStack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory = () => {
  const { transactionHistory, getTransactionHistory } = useCart();
  const { user } = useAuth();
  const bgColor = useColorModeValue('#FFF', '#141026');
    const secondaryBgColor = useColorModeValue('#f5f5f5', '#13031F');


  useEffect(() => {
    getTransactionHistory(user);
    console.log(transactionHistory);
  }, []);

  return (
    <VStack w="100%">
      <Text fontWeight="bold" fontSize="xl" mt={6} p={3}>
        Transaction History
      </Text>
      <VStack w="100%" bg={bgColor} maxW="400px" borderRadius="xl" p={3} spacing={3}>
        {transactionHistory?.map(item => (
          <VStack p={3} key={item.id}  w="100%" borderRadius="lg" bg={secondaryBgColor} >
            <Flex justifyContent="space-between" w="100%">
              <Text fontWeight="bold" color="green.300">{item.status}</Text>
              <Text>{item.createdAt.toDate().toLocaleTimeString('en-US')}</Text>
            </Flex>
            <Flex w="100%">
              <Text isTruncated>{item.payer.email_address}</Text>
            </Flex>
            <Flex w="100%">
              <Text>{item.payer.name.given_name} {item.payer.name.surname}</Text>
            </Flex>
            <Flex w="100%">
              <Text>{item.purchase_units[0].description} </Text>
            </Flex>
            <Flex w="100%">
              <Text fontWeight="bold" fontSize="xl">
                {item.purchase_units[0].amount.currency_code}{' '}
                {item.purchase_units[0].amount.value}
              </Text>
            </Flex>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default TransactionHistory;
