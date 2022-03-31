import React from 'react';
import { Flex, Text, Center, useColorModeValue, Image } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';

const PageCategories = () => {
  const { categories, getCategories } = useShop();
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const secondaryHoverBgColor = useColorModeValue('teal.200', 'teal.700');

  return (
    <Flex flexDir="column" w="100%" alignItems="center">
      <Center my={5}>
        <Text fontSize="xl" fontWeight="bold">
          All Categories
        </Text>
      </Center>
      <Flex flexWrap="wrap" justifyContent="center">
        {categories?.map((category, i) => (
          <Link key={i} to={`/categories/${category.name}`}>
            <Flex
              flexDir="column"
              p={3}
              borderRadius="1rem"
              m={2}
              bg={secondaryBgColor}
              _hover={{ bg: secondaryHoverBgColor, transform: "scale(1.05)" }}
              cursor="pointer"
              transition="all ease 0.3s"
              boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"
            >
              <Image
                boxSize="250px"
                src={category?.thumbnailURL}
                objectFit="cover"
                borderRadius="0.5rem"
              />
              <Text
                mt={2}
                p={2}
                fontWeight="bold"
                fontSize="xl"
                textAlign="center"
              >
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
