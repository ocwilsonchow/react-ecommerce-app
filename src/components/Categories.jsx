import React, { useEffect } from 'react';
import { Text, Button, Flex } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';

const Categories = () => {
  const { categories, getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex px={6} py={1} mt={2} flexWrap="wrap" justifyContent="center">
      {categories?.map((category, i) => (
        <Button size="xs" key={i} py={4} px={4} m={1} borderRadius="1rem" variant="outline">
          {category.name}
        </Button>
      ))}
    </Flex>
  );
};

export default Categories;
