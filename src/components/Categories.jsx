import React, { useEffect} from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';

const Categories = () => {
  const { categories, getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex p={6}>
      {categories?.map((category, i) => (
        <Badge colorScheme="cyan" key={i} py={1} px={3} mx={2} borderRadius="1rem">
          {category.name}
        </Badge>
      ))}
    </Flex>
  );
};

export default Categories;
