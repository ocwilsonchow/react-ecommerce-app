import React from 'react';
import { Flex, Text, Center, useColorModeValue } from '@chakra-ui/react';

const PagesShow = () => {
  const bgColor = useColorModeValue('#f5f5f5', '#13031F')


  return (
    <Flex flexDir="column" bg={bgColor} w="100%" h="100vh" overflow="auto">
      <Center w="100%" p={5}>
        <Text fontWeight="bold" fontSize="4xl">
          Show Specific Product
        </Text>
      </Center>
    </Flex>
  );
};

export default PagesShow;
