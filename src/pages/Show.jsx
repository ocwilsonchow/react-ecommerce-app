import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Spinner,
  Button,
  Badge,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import { useShop } from '../contexts/ShopContext';
import { useCart } from '../contexts/CartContext';
import SuggestedProducts from '../components/SuggestedProducts';

const PagesShow = () => {
  const bgColor = useColorModeValue('#f5f5f5', '#13031F');
  const { product, getProduct } = useShop();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { createCartItem } = useCart();

  useEffect(() => {
    if (id) {
      getProduct(id);
      setLoading(false);
    }
  }, [id]);

  return (
    <Flex
      flexDir="column"
      bg={bgColor}
      w="100%"
      overflow="auto"
      alignItems="center"
    >
      <VStack justifyContent="space-between" h="100%" py={6}>
        {product && (
          <Flex
            p={2}
            w="100%"
            flexDir={{ base: 'column', sm: 'column', md: 'row' }}
            justifyContent="center"
            alignItems={{ sm: 'center', md: 'flex-start' }}
          >
            {(loading && <Spinner size="xl" />) || (
              <Image
                boxSize={['100%', '50%', 'xs', '350px']}
                src={product?.image}
                objectFit="cover"
                borderRadius="1rem"
                mb={5}
                mr={5}
                ml={4}
              />
            )}
            <Flex flexDir="column" maxW="600px" justifyContent="space-between">
              <Flex flexDir="column">
                <Text fontWeight="bold" fontSize="3xl" mx={4}>
                  {product?.name}
                </Text>
                <HStack mx={4} mt={2}>
                  <Badge fontSize="sm" colorScheme="twitter">
                    {product?.category}
                  </Badge>
                  {product?.stock > 0 ? (
                    <Badge fontSize="sm" colorScheme="orange">
                      In stock
                    </Badge>
                  ) : (
                    <Badge fontSize="sm" colorScheme="">
                      Out of Stock
                    </Badge>
                  )}
                </HStack>
              </Flex>
              <Text m={4} fontWeight="light">
                {product?.description || 'No description.'}
              </Text>
              <Text m={4} fontSize="xl" fontWeight="medium">
                HKD {product?.price}
              </Text>
              <Flex mx={3} mt={5} alignItems="center">
                <IconButton
                  mr={5}
                  size="lg"
                  borderRadius="50%"
                  icon={<MdFavorite />}
                  variant="outline"
                />
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="twitter"
                  disabled={product?.stock == 0}
                  borderRadius="1rem"
                  onClick={() => createCartItem(product)}
                >
                  Add to cart
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
        {product && <SuggestedProducts productCategory={product.category} />}
      </VStack>
    </Flex>
  );
};

export default PagesShow;
