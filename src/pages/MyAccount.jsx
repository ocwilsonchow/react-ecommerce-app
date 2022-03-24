import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Center,
} from '@chakra-ui/react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useToast } from '@chakra-ui/react';

const PagesMyAccount = () => {
  const { user } = useAuth();
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const storage = getStorage();

  const storageRef = ref(storage, 'images/' + image?.name);
  const uploadTask = uploadBytesResumable(storageRef, image);

  // Upload image onChange of image's state
  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const handleUpload = async () => {
    setLoading(true);
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
          setLoading(false);
          // console.log('File available at', url);
          toast({
            title: 'Image uploaded.',
            description: 'Image successfully added to firebase storage',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
      }
    );
  };
  //

  const handleChange = async e => {
    setLoading(true);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setLoading(false);
  };

  return (
    <Flex>
      <VStack w="100%" alignItems="center">
        <Text py={5} fontWeight="bold" fontSize="xl">
          My Account Settings
        </Text>
        <FormControl display="flex" flexDir="column" maxW="500px">
          <VStack p={5}>
            <Avatar size="xl" />
          </VStack>
          <Input
            type="file"
            variant="flushed"
            name="image"
            id="image"
            mb={4}
            onChange={handleChange}
          />

          <FormLabel>Username</FormLabel>
          <Input
            mb={4}
            placeholder={
              user?.displayName || 'You have not set up your username'
            }
          />

          <FormLabel>Email</FormLabel>
          <Input mb={4} value="" placeholder={user?.email} />

          <FormLabel>Username</FormLabel>
          <Input mb={4} placeholder="Password" type="password" />
        </FormControl>
        <Button type="submit" isLoading={loading} disabled={loading}>Update My Profile</Button>
      </VStack>
    </Flex>
  );
};

export default PagesMyAccount;
