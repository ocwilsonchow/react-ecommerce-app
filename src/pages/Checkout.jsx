import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import CartTotal from '../components/CartTotal';
import PayPal from '../components/PayPal';

const PagesCheckout = () => {
  const { user } = useAuth();
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity } =
    useCart();
  const secondaryHoverBgColor = useColorModeValue('teal.600', 'teal.700');
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48');
  const modalBgColor = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.7)'
  );

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue('#FFFFFF', '#141026');
  let stripePromise;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get Stripe
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    }
    return stripePromise;
  };

  // Define Stripe Checkout Item
  const item = {
    price: 'price_1KgkaIGL048Bas4mW4WP2Ep2',
    quantity: 1,
  };

  // Define Stripe Checkout Options
  const checkoutOptions = {
    lineItems: [item],
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/checkout`,
  };

  // Check out call
  const redirectToCheckout = async () => {
    setLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe
      .redirectToCheckout(checkoutOptions)
      .then(() => {
        setLoading(false);
        console.log('redirected');
      })
      .catch(err => {
        setLoading(false);
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack w="100%" flexDir="column" alignItems="center">
      <Flex justifyContent="center" w="100%" flexWrap="wrap">
        <VStack
          mx={2}
          alignItems="center"
          minW="350px"
          maxW="700px"
          spacing="15px"
          p={4}
          mb={8}
          borderRadius="xl"

        >
          <Center p={4}>
            <Text fontWeight="bold" fontSize="2xl">
              My Cart
            </Text>
          </Center>
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
              boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
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

                <Flex
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex flexDir="column" px={1}>
                    <Tooltip label={item.productName}>
                      <Text color="white" fontWeight="bold" maxW="130px" isTruncated>
                        {item.productName}
                      </Text>
                    </Tooltip>
                    <HStack>
                      <Text color="white" fontWeight="light">
                        HKD {item.price}
                      </Text>
                    </HStack>
                  </Flex>
                  <Flex>
                    <IconButton
                      mr={2}
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
          <Flex w="100%" pt={4}>
            <CartTotal />
          </Flex>
          <Flex flexDir="column" w="100%">
            <Button
              mb={3}
              variant="outline"
              onClick={() => navigate('/')}
              size="lg"
            >
              Continue shopping
            </Button>

            <Button
              disabled={!user || loading || cartItems.length === 0}
              isLoading={loading}
              type="submit"
              onClick={redirectToCheckout}
              mb={3}
              variant="outline"
              size="lg"
            >
              {(cartItems.length === 0 && 'No item in shopping cart') ||
                'Pay with Stripe'}
            </Button>

            <Button
              disabled={!user || loading || cartItems.length === 0}
              isLoading={loading}
              type="submit"
              mb={3}
              onClick={onOpen}
              colorScheme="yellow"
              size="lg"
            >
              Pay with PayPal
            </Button>
          </Flex>
        </VStack>

        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={modalBgColor} backdropFilter="blur(8px)">
              <ModalBody justifyContent="center" py={4}>
                <PayPal />
                <Center>
                  <Button colorScheme="gray" onClick={onClose}>
                    Cancel
                  </Button>
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      </Flex>
    </VStack>
  );
};

export default PagesCheckout;
