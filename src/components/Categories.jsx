import React, { useEffect } from 'react';
import { Text, Button, Flex, IconButton } from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';


const Categories = () => {
  const { categories, getCategories } = useShop();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Flex px={6} py={2} mt={2} flexWrap="wrap" justifyContent="center" alignItems="center">
      <IconButton
            icon={<SearchIcon />}
            size="sm"
            variant="outline"
            mr={1}
            borderRadius="full"
          />
      {categories?.map((category, i) => (
        <Link key={i} to={`/categories/${category.name}`} >
          <Button size="xs"  py={4} px={4} m={1} borderRadius="full" variant="outline">
          {category.name}
        </Button>
        </Link>
      ))}

    </Flex>
  );
};

export default Categories;
