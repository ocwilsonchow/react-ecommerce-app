import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Center,
} from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const PagesOrder = () => {
  const { transactionHistory, getTransactionHistory } = useCart();
  const { user } = useAuth();
  const bgColor = useColorModeValue('#FFF', '#141026');
  const secondaryBgColor = useColorModeValue('#f5f5f5', '#13031F');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getTransactionHistory();
    }
  }, [user]);

  return (
    <VStack w="100%" p={2}>
      <VStack
        w="100%"
        maxW="450px"
        borderRadius="xl"
        p={4}
        spacing={3}
        pb={8}
      >
        <Center w="100%" pb={4}>
          <Text fontWeight="bold" fontSize="2xl">
            Transaction History
          </Text>
        </Center>
        {transactionHistory.length === 0 && (
          <VStack p={2}>
            <Text>No transaction history</Text>
            <Center py={4}>
              <Button colorScheme="linkedin" onClick={() => navigate('/')}>
                Go Shopping!
              </Button>
            </Center>
          </VStack>
        )}
        {transactionHistory?.map(item => (
          <VStack
            p={4}
            key={item.id}
            w="100%"
            borderRadius="lg"
            bg={bgColor}
          >
            <Flex justifyContent="space-between" w="100%">
              <Text fontWeight="bold" color="green.300">
                {item?.status}
              </Text>
              <Text>
                {item?.createdAt.toDate().toLocaleTimeString('en-US')}
              </Text>
            </Flex>
            <Flex w="100%">
              <Text isTruncated>{item?.payer.email_address}</Text>
            </Flex>
            <Flex w="100%">
              <Text>
                {item?.payer.name.given_name} {item?.payer.name.surname}
              </Text>
            </Flex>
            <Flex w="100%">
              <Text>{item?.purchase_units[0].description} </Text>
            </Flex>
            <Flex w="100%">
              <Text fontWeight="bold" fontSize="xl">
                {item?.purchase_units[0].amount.currency_code}{' '}
                {item?.purchase_units[0].amount.value}
              </Text>
            </Flex>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default PagesOrder;
