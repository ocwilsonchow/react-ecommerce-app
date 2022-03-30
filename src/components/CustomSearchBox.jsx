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
  Flex,
  Button,
} from '@chakra-ui/react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <Flex w="100%">
    <FormControl noValidate action="" role="search">
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          type="search"
          bg="none"
          variant="flushed"
          mr={3}
          placeholder="Search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        />

      </InputGroup>
    </FormControl>
  </Flex>
);

export const CustomSearchBox = connectSearchBox(SearchBox);
