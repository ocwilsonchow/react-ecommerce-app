import React from 'react';
import { Flex, Text, Center } from '@chakra-ui/react';

function PagesNotFound() {
  return (
    <Flex w="100%">
      <Center w="100%">
        <Text fontWeight="bold" fontSize="4xl" p={10}>
          Page Not Found!
        </Text>
      </Center>
    </Flex>
  );
}

export default PagesNotFound;
