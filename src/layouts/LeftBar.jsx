import React from 'react';
import {
  Center,
  Flex,
  Box,
  Text,
  VStack,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaStore, FaThList, FaTrophy, FaCartArrowDown, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');
  const { signout, user } = useAuth();

  const handleSignOut = () => {
    signout()
  }

  return (
    <VStack spacing={5} alignItems="center" bg={bgColor} h="100vh" py={5}>
      <Link to="/"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaStore />} /></Link>
      <Link to="/categories"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaThList />} /></Link>
      <Link to="/cart"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaCartArrowDown />} /></Link>
      <Link to="/categories"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaTrophy />} /></Link>
      <ColorModeSwitcher  borderRadius="50%" m={0} />
      {!user && <Link to="/auth"><IconButton color="blue.500" variant="ghost" borderRadius="50%" size="lg" icon={<FaUserCog />} /></Link>}
      {user && <IconButton onClick={handleSignOut} variant="ghost" color="red.500" icon={<FaSignOutAlt />}/>}
    </VStack>
  );
};

export default LeftBar;
