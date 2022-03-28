import React from 'react';
import { Center, Flex, theme, useColorModeValue } from '@chakra-ui/react';
import './App.scss';
import '@stripe/stripe-js';

import LeftBar from '../layouts/LeftBar';
import RightBar from '../layouts/RightBar';
import Categories from '../components/Categories';

import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';

function App() {
  const bgColor = useColorModeValue('#f5f5f5', '#13031F');
  const barBgColor = useColorModeValue('#FFF', '#141026');

  return (
    <Flex>
      <Flex
        h="100vh"
        minW="80px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
      >
        <LeftBar />
      </Flex>
      <Flex display="block" h="100vh" overflow="auto" w="100%" bg={bgColor}>
        <TopBar />
        <Categories />
        <Outlet />
      </Flex>
      <Flex
        h="100vh"
        px={2}
        minW={['80px', '80px', '90px', '300px']}
        display={{ base: 'none', sm: 'none', md: 'block' }}
        overflow="auto"
        bg={barBgColor}
      >
        <RightBar />
      </Flex>
    </Flex>
  );
}

export default App;
