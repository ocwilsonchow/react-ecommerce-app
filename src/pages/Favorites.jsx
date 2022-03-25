import React from 'react'
import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  HStack,
  VStack
} from '@chakra-ui/react';

const PagesFavorites = () => {
  return (
    <Flex w="100%" flexDir="column" alignItems="center">
     <VStack w="100%">
        <Text fontWeight="bold" fontSize="2xl" my={5}>
          Favorites
        </Text>
      </VStack>

    </Flex>
  )
}

export default PagesFavorites
