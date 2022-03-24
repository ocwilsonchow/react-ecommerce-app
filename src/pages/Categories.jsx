import React from 'react';
import { Flex, Text, Center, useColorModeValue, Image } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';


const PageCategories = () => {
  const { categories, getCategories } = useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryHoverBgColor = useColorModeValue('teal.200', 'teal.700');


  return (
    <Flex flexDir="column" w="100%">
    <Center my={5}>
      <Text fontSize="xl" fontWeight="bold">All Categories</Text>
    </Center>
      <Flex flexWrap="wrap" justifyContent="center">
        {categories?.map(category => (
          <Link to={`/categories/${category.name}`}>
            <Flex
            flexDir="column"
            key={category?.name}
            p={3}
            borderRadius="1rem"
            m={2}
            bg={secondaryBgColor}
            _hover={{ bg: secondaryHoverBgColor }}
            cursor="pointer"
            transition="all ease 0.3s"
          >
            <Image
              boxSize="xs"
              src={category?.thumbnailURL}
              objectFit="cover"
              borderRadius="0.5rem"
            />
            <Text mt={2} p={2} fontWeight="bold" fontSize="xl" textAlign="center">
              {category?.name}
            </Text>
          </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default PageCategories;
