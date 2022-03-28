import React, { useRef, useEffect, useState } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

const PayPal = () => {
  const paypal = useRef();
  const bgColor = useColorModeValue('#FFFFFF', '#141026');

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Artistry Collection',
                amount: {
                  value: 400.0,
                  current_code: 'HKD',
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
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
