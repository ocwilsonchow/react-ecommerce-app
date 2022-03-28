import { Image } from '@chakra-ui/image';
import { Center, VStack, Text, Flex, HStack } from '@chakra-ui/layout';
import React from 'react';
import { SiFirebase, SiReact } from 'react-icons/si';

const PagesAbout = () => {
  const techStacks = [
    {
      title: 'React.js',
      icon: <SiReact size="50px" />,
    },
    {
      title: 'Firebase',
      icon: <SiFirebase size="50px" />,
    },
    {
      title: 'Chakra UI',
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          role="img"
          viewBox="0 0 24 24"
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title></title>
          <path d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.648 0 12 0zm2.8 4.333c.13-.004.248.136.171.278l-3.044 5.58a.187.187 0 00.164.276h5.26c.17 0 .252.207.128.323l-9.22 8.605c-.165.154-.41-.063-.278-.246l4.364-6.021a.187.187 0 00-.151-.296H6.627a.187.187 0 01-.131-.32l8.18-8.123a.182.182 0 01.125-.056z"></path>
        </svg>
      ),
    },
  ];

  return (
    <VStack w="100%">
      <VStack py={20} px={4}>
        <Text fontSize="5xl" fontWeight="bold" textAlign="center">
          About This Project
        </Text>
        <Text fontSize="lg" textAlign="center">
          A modern e-commerce web application, built with React, Firebase and
          Chakra UI.
        </Text>
        <Flex justifyContent="space-between" pt={6}>
          {techStacks?.map((item, i) => (
            <VStack key={i} p={6}>
              {item.icon}
              <Text>{item.title}</Text>
            </VStack>
          ))}
        </Flex>
      </VStack>
      <Center w="100%" py={8}>
        <VStack maxW="400px"></VStack>
      </Center>
    </VStack>
  );
};

export default PagesAbout;
