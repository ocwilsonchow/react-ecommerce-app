import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  FormControl,
  Kbd,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useShop } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';

const Categories = () => {
  const { categories, getCategories, getQueryProducts } = useShop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, []);

  const handleSearch = e => {
    if (e.key === 'Enter') {
      onClose()
      getQueryProducts(searchInput);
    }
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <Flex
      px={6}
      py={2}
      mt={2}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <>
        <IconButton
          icon={<SearchIcon />}
          size="sm"
          variant="outline"
          mr={2}
          borderRadius="full"
          onClick={onOpen}
        />
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent p={2} mx={2} mt={10}>
            <FormControl>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  bg="none"
                  variant="none"
                  mr={3}
                  placeholder="Search"
                  onChange={e => handleOnChange(e)}
                  onKeyDown={e => handleSearch(e)}
                />
                <InputRightElement>
                  <Kbd mr={6}>Enter</Kbd>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalContent>
        </Modal>
      </>

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
