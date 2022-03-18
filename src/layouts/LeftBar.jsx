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
import { FaStore, FaThList, FaTrophy, FaCartArrowDown, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LeftBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C');

  return (
    <VStack spacing={5} alignItems="center" bg={bgColor} h="100vh" py={5}>
      <Link to="/"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaStore />} /></Link>
      <Link to="/categories"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaThList />} /></Link>
      <Link to="/cart"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaCartArrowDown />} /></Link>
      <Link to="/categories"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaTrophy />} /></Link>
      <Link to="/auth"><IconButton variant="ghost" borderRadius="50%" size="lg" icon={<FaUserCog />} /></Link>
      <ColorModeSwitcher  borderRadius="50%" m={0} />
    </VStack>
  );
};

export default LeftBar;
