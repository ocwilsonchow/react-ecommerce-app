import React, { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  Center,
  Image,
  Flex,
  VStack,
  Button,
  Text,
  HStack,
  useColorModeValue,
  IconButton,
  Tooltip,
  Tag,
  Square,
} from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { MinusIcon, AddIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';

const PagesCheckout =  () => {
  const [message, setMessage] = useState('');
  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity } =
    useCart();
  const { user } = useAuth();
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  let stripePromise

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    } return stripePromise
  }

  const item = {
    price: "price_1KgkaIGL048Bas4mW4WP2Ep2",
    quantity: 1
  }

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  }

  const redirectToCheckout = async () => {
    console.log("redirected")

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout(checkoutOptions)
    console.log("stripe checkout error", error)
  }


  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <VStack w="100%">
        <Text fontWeight="bold" fontSize="2xl" my={5}>
          Cart
        </Text>
      </VStack>

      <VStack
        alignItems="center"
        minW="350px"
        maxW="700px"
        spacing="15px"
        p={3}
      >
        {cartItems.map(item => (
          <Flex
            key={item.id}
            bg={tertiaryBgColor}
            p={2}
            w="100%"
            borderRadius="1rem"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            _hover={{ bg: secondaryHoverBgColor }}
            transition="all ease 0.3s"
            cursor="pointer"
          >
            <Tag
              justifyContent="center"
              alignItems="center"
              colorScheme={(item.quantity !== 0 && 'twitter') || 'red'}
              fontWeight="extrabold"
              variant="solid"
              borderRadius="full"
              position="absolute"
              top="0px"
              left="-5px"
            >
              {item.quantity}
            </Tag>

            <Flex alignItems="center" w="100%">
              <Square>
                <Image
                  objectFit="cover"
                  boxSize="80px"
                  src={item.productImageURL}
                  borderRadius="0.5rem"
                  mr={2}
                />
              </Square>

              <Flex w="100%" justifyContent="space-between" alignItems="center">
                <Flex flexDir="column" px={2}>
                  <Tooltip label={item.productName}>
                    <Text color="white" fontWeight="bold">
                      {item.productName}
                    </Text>
                  </Tooltip>
                  <HStack>
                    <Text color="white" fontWeight="light">
                      HKD {item.price}
                    </Text>
                  </HStack>
                </Flex>
                <Flex p={2}>
                  <IconButton
                    mr={1}
                    borderRadius="50%"
                    size="xs"
                    icon={
                      (item.quantity > 0 && <MinusIcon />) || <DeleteIcon />
                    }
                    onClick={() =>
                      decreaseCartItemQuantity(item.id, item.quantity)
                    }
                  />
                  <IconButton
                    borderRadius="50%"
                    size="xs"
                    icon={<AddIcon />}
                    onClick={() => increaseCartItemQuantity(item.id)}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ))}
        <Center py={10}>
          <Button disabled={!user} type="submit" onClick={redirectToCheckout}>
            {(cartItems.length == 0 &&
              'Please login to view your shopping cart.') ||
              'Go to Payment'}
          </Button>
        </Center>
      </VStack>
    </Flex>
  );
};

export default PagesCheckout;
