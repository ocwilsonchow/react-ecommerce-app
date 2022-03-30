import { Badge, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hit({ hit }) {
  const ID = hit.objectID;
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" overflow="auto" w="100%">
      <Flex
        cursor="pointer"
        px={4}
        py={3}
        fontWeight="bold"
        _hover={{ color: 'blue.500' }}
        borderRadius="xl"
        onClick={() => {
          navigate(`/product/${ID}`);
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex alignItems="center">
          <Image
            boxSize="50px"
            objectFit="cover"
            borderRadius="xl"
            mr={4}
            src={hit.image}
          />
          <Text>{hit.name}</Text>
        </Flex>
        <Badge colorScheme="twitter">{hit.category}</Badge>
      </Flex>
    </Flex>
  );
}
