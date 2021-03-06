import React, { useState, useEffect } from 'react';
import { Text, Button, Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import SearchBar from './SearchBar';

const Categories = () => {
  const { categories, getCategories, getQueryProducts } = useShop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, []);

  return (
    <Flex
      px={6}
      py={2}
      mt={2}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <SearchBar />
      <a
        target="_blank"
        href="https://github.com/ocwilsonchow/react-ecommerce-app"
      >
        <IconButton
          icon={<FaGithub />}
          size="sm"
          variant="outline"
          mr={1}
          borderRadius="full"
        />
      </a>
      {categories?.map((category, i) => (
        <Link key={i} to={`/categories/${category.name}`}>
          <Button
            size="xs"
            py={4}
            px={4}
            m={1}
            borderRadius="full"
            variant="outline"
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </Flex>
  );
};

export default Categories;
