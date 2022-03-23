import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Center,
  useColorModeValue,
  Image,
  HStack,
  Spinner,
  Button,
  Badge,
  Tag,
  Box,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import Categories from '../components/Categories';

const PagesShowCategory = () => {
  return (
    <Flex
      flexDir="column"
      w="100%"

      overflow="auto"
      alignItems="center"
    >
      <Text p={10} fontWeight="bold">
        Show specific category
      </Text>
    </Flex>
  );
};

export default PagesShowCategory;
