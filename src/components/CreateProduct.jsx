import React, { useState, useRef } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Textarea,
  Select,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button
} from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';

const CreateProduct = () => {
  const nameRef = useRef()
  const categoryRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const stockRef = useRef()



  return (
    <Flex flexDir="column" p={5}>
      <Text fontWeight="bold">Create New Product</Text>
      <FormControl my={5}>
        <Input my={2} id="name" name="name" placeholder="Product name" />
        <Select my={2} placeholder="Select category">
          <option value="Cosmetics">Cosmetics</option>
          <option value="Home Technologies">Home Technologies</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Skin care">Skin care</option>
        </Select>
        <Textarea my={2} placeholder="Product description" />
        <Input my={2}  placeholder="HKD" type="number" />
        <NumberInput my={2} >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button>Create</Button>
    </Flex>
  );
};

export default CreateProduct;
