import React, { useEffect} from 'react';
import { Badge, Button, Flex } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';

const Categories = () => {
  const { categories, getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex px={6} py={4} flexWrap="wrap">
      {categories?.map((category, i) => (
        <Button size="xs" key={i} py={4} px={4} m={1} borderRadius="1rem" >
          {category.name}
        </Button>
      ))}
    </Flex>
  );
};

export default Categories;
