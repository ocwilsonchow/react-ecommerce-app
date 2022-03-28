import React, { useRef, useEffect, useState } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const PayPal = () => {
  const paypal = useRef();
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  const { cartTotal, cartItems, handleCompletedTransaction } = useCart();
  const navigate = useNavigate();
  let newArray = []

  const summaryDescription = cartItems.map((item) => {
    if (item.quantity > 0) {
      newArray.push(item.productName + " x" + item.quantity)
    }
  })
  const jointArray = newArray.join(', ')

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: jointArray,
                amount: {
                  currency_code: 'HKD',
                  value: cartTotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          handleCompletedTransaction(order)
          navigate('/success')
        },
        onError: err => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <Flex
      m={2}
      minW="380px"
      maxW="700px"
      spacing="15px"
      p={4}
      mb={8}
      bg={bgColor}
      borderRadius="xl"
    >
      <Flex ref={paypal} w="100%"></Flex>
    </Flex>
  );
};

export default PayPal;
