import React, { useEffect} from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';

const Categories = () => {
  const { categories, getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex px={6} py={4} flexWrap="wrap">
      {categories?.map((category, i) => (
        <Badge colorScheme="purple" key={i} py={1} px={3} m={1} borderRadius="1rem">
          {category.name}
        </Badge>
      ))}
    </Flex>
  );
};

export default Categories;
