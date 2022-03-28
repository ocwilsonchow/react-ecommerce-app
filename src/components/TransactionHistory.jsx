import React, { useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

const TransactionHistory = () => {
  const { transactionHistory, getTransactionHistory } = useCart();

  useEffect(() => {
    getTransactionHistory();
  }, []);

  console.log(transactionHistory);

  return <VStack w="100%">Transaction History</VStack>;
};

export default TransactionHistory;
