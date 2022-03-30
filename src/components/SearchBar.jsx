import React, { useState } from 'react';
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  InputGroup,
  useColorModeValue,
  textDecoration
} from '@chakra-ui/react';
import { useShop } from '../contexts/ShopContext';
import { SearchIcon } from '@chakra-ui/icons';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Hit } from '../components/Hit';
import { CustomSearchBox } from './CustomSearchBox';
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBgColor = useColorModeValue("rgba(255,255,255,0.7)", "rgba(20,16,38,0.6)")
  const navigate = useNavigate()

  const searchClient = algoliasearch(
    'AYPI2XQYIB',
    '3a996cfd4d79f2d86401bd24267cdebc'
  );

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2} mx={2} mt={10} bg={modalBgColor} backdropFilter="blur(8px)">
          <InstantSearch searchClient={searchClient} indexName={'productName'}>
            <InputGroup>
              <CustomSearchBox />
            </InputGroup>

            <Hits hitComponent={Hit } textDecoration="none" onClick={onClose} />
          </InstantSearch>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBar;
