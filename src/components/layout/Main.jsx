import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Main = () => {
  const bgColor = useColorModeValue('#F4F4F4', '#161633');

  return (
    <Flex bg={bgColor} w="100%" p={5}>
      <Text>Main</Text>
    </Flex>
  );
};

export default Main;
