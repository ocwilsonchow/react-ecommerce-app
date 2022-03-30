import React, { useState } from 'react';
import {
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
import { useShop } from '../contexts/ShopContext';
import { SearchIcon } from '@chakra-ui/icons';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import { Hit } from '../components/Hit'

const SearchBar = () => {
  const { getQueryProducts } = useShop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState('');

  const searchClient = algoliasearch(
    'AYPI2XQYIB',
    '3a996cfd4d79f2d86401bd24267cdebc'
  );

  const handleSearch = e => {
    if (e.key === 'Enter') {
      onClose();
      getQueryProducts(searchInput);
    }
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <IconButton
        icon={<SearchIcon />}
        size="sm"
        variant="outline"
        mr={2}
        borderRadius="full"
        onClick={onOpen}
      />
      <InstantSearch searchClient={searchClient} indexName={"productName"}>
          <SearchBox />
          <Hits hitComponent={Hit}/>
      </InstantSearch>
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
  );
};

export default SearchBar;
