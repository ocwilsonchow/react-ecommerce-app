import React, { useState, useEffect } from 'react';
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
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const PagesMyAccount = () => {
  const { user, updateUserProfile } = useAuth();
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const storage = getStorage();
  const storageRef = ref(storage, 'images/' + image?.name);
  const uploadTask = uploadBytesResumable(storageRef, image);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const bgColor = useColorModeValue('#FFF', '#141026');
  const navigate = useNavigate();

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

  const handleNameChange = name => {
    setDisplayName(name);
  };

  const handleUpdateUserProfile = async e => {
    e.preventDefault();
    await updateUserProfile(displayName, imageURL).then(() => {
      setDisplayName();
    });
  };

  return (
    <Flex>
      <VStack w="100%" alignItems="center" px={2} pb={6}>
        <FormControl
          display="flex"
          flexDir="column"
          maxW="400px"
          p={10}
          borderRadius="2xl"
        >
          <Center pb={8}>
            <Text fontWeight="bold" fontSize="2xl">
              My Account Settings
            </Text>
          </Center>
          <VStack pb={6}>
            <Avatar size="xl" src={user?.photoURL} />
          </VStack>
          <FormLabel>Avatar</FormLabel>
          <Input
            p={1}
            type="file"
            variant="outline"
             bg={bgColor}
            name="image"
            id="image"
            mb={4}
            onChange={handleChange}
          />

          <FormLabel>Username</FormLabel>
          <Input
            mb={8}
            placeholder={
              user?.displayName || 'You have not set up your username'
            }
             bg={bgColor}
            type="text"
            onChange={e => handleNameChange(e.target.value)}
          />

          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            onClick={e => handleUpdateUserProfile(e)}
            colorScheme="linkedin"
          >
            Update My Profile
          </Button>
          <Flex w="100%" justifyContent="center" pt={4}>
            <Button variant="link" onClick={() => navigate('/my/order')}>
              See my order history
            </Button>
          </Flex>
        </FormControl>
      </VStack>
    </Flex>
  );
};

export default PagesMyAccount;
