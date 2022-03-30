import { Flex, VStack } from '@chakra-ui/layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hit({ hit }) {
  const ID = hit.objectID;
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" overflow="auto" w="100%">
      <Flex
        cursor="pointer"
        p={4}
        _hover={{ fontWeight: 'bold' }}
        borderRadius="xl"
        onClick={() => {
          navigate(`/product/${ID}`);

        }}
      >
        {hit.name}
      </Flex>
    </Flex>
  );
}
