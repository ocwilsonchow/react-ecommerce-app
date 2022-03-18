import React, { useState, useRef, useEffect } from 'react';
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
  Button,
} from '@chakra-ui/react';

import { useShop } from '../contexts/ShopContext';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const CreateProduct = () => {
  const nameRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const storage = getStorage();
  const { createProduct } = useShop();

  const storageRef = ref(storage, 'images/' + image?.name);
  const uploadTask = uploadBytesResumable(storageRef, image);

  console.log(image);

  useEffect(() => {
    if (image) {
      handleUpload()
    }
  }, [image])

  const handleUpload = async () => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImageURL(url);
          console.log('File available at', url);
        });
      }
    );
  };

  const handleChange = async e => {
    setLoading(true);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setLoading(false);
  };

  const handleCreateProduct = async e => {
    e.preventDefault();



    try {
      setError('');
      setLoading(true);
      await createProduct(
        nameRef.current.value,
        categoryRef.current.value,
        descriptionRef.current.value,
        priceRef.current.value,
        stockRef.current.value,
        imageURL
      );
    } catch {
      setError('Failed to create product');
    }
    setLoading(false);
  };

  return (
    <Flex flexDir="column" p={5}>
      <Text fontWeight="bold">Create New Product</Text>
      <FormControl my={5} required>
        <Input
          my={2}
          id="name"
          name="name"
          placeholder="Product name"
          ref={nameRef}
        />
        <Select my={2} placeholder="Select category" ref={categoryRef}>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Home Technologies">Home Technologies</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Skin care">Skin care</option>
        </Select>
        <Textarea
          my={2}
          placeholder="Product description"
          ref={descriptionRef}
        />
        <Input
          type="file"
          variant="flushed"
          name="image"
          id="image"
          my={2}
          onChange={handleChange}
        />
        <Input my={2} placeholder="HKD" type="number" ref={priceRef} />
        <NumberInput my={2}>
          <NumberInputField ref={stockRef} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Text>{error && error}</Text>
      <Button isLoading={loading} type="submit" onClick={handleCreateProduct}>
        Create
      </Button>
    </Flex>
  );
};

export default CreateProduct;
