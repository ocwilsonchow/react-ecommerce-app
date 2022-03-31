import React, { useState, useRef } from 'react';
import {
  Flex,
  Center,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PagesAuth = () => {
  const secondaryBgColor = useColorModeValue('#FFFFFF', '#1D213C');

  const [isSignup, setIsSignup] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup, login, user } = useAuth();

  const handleSignup = async e => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Password do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  if (user & user?.isAnonymous)
    return (
      <VStack w="100%">
        <Center w="100%" py={10} fontWeight="bold" fontSize="xl">
          You have successfully logged in
        </Center>
        <Button onClick={() => navigate('/')}>Go to Home Page</Button>
      </VStack>
    );

  return (
    <Flex flexDir="column" w="100%" p={5} alignItems="center">
      <VStack
        bg={secondaryBgColor}
        borderRadius="1rem"
        m={8}
        p={8}
        w="100%"
        maxW="400px"
      >
        {isSignup && (
          <FormControl>
            <Text fontWeight="bold" fontSize="3xl">
              Sign up
            </Text>

            <Flex flexDir="column" my={4}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                id="username"
                type="text"
                ref={usernameRef}
                required
              />
            </Flex>

            <Flex flexDir="column" my={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                id="email"
                type="text"
                ref={emailRef}
                required
              />
            </Flex>

            <Flex flexDir="column" my={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
                ref={passwordRef}
              />
            </Flex>

            <Flex flexDir="column" my={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                ref={confirmPasswordRef}
                required
              />
            </Flex>

            <HStack>
              <Text>Have an account already?</Text>
              <Button size="sm" variant="link" onClick={switchMode}>
                Log in
              </Button>
            </HStack>

            <Center p={5}>
              <Button isLoading={loading} type="submit" onClick={handleSignup}>
                Sign up
              </Button>
            </Center>
          </FormControl>
        )}

        {!isSignup && (
          <FormControl>
            <Text fontWeight="bold" fontSize="3xl">
              Log in
            </Text>

            <Flex flexDir="column" my={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                id="email"
                type="text"
                ref={emailRef}
                required
              />
            </Flex>

            <Flex flexDir="column" my={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
            </Flex>

            <HStack>
              <Text>Have not created an account?</Text>
              <Button size="sm" variant="link" onClick={switchMode}>
                Sign up
              </Button>
            </HStack>

            <Center p={5}>
              <Button isLoading={loading} type="submit" onClick={handleLogin}>
                Log in
              </Button>
            </Center>
          </FormControl>
        )}

        {error && <Flex>{error}</Flex>}
      </VStack>
    </Flex>
  );
};

export default PagesAuth;
