import React from 'react';
import { Flex, theme, useColorModeValue } from '@chakra-ui/react';
import './App.scss';

import LeftBar from '../layouts/LeftBar';
import RightBar from '../layouts/RightBar';
import Categories from '../components/Categories';

import { Outlet } from 'react-router-dom';

function App() {
    const bgColor = useColorModeValue('#f5f5f5', '#13031F');


  return (
    <Flex w="100vw">
      <Flex
        h="100vh"
        minW="80px"
        display={{ base: 'none', sm: 'none', md: 'grid' }}
      >
        <LeftBar />
      </Flex>
      <Flex display="block" h="100vh" overflow="auto" w="100%" bg={bgColor} >
        <Categories/>
        <Outlet />
      </Flex>
      <Flex
        h="100vh"
        minW={['80px', '80px', '90px', '280px']}
        display={{ base: 'none', sm: 'none', md: 'grid' }}
        overflow="auto"
      >
        <RightBar />
      </Flex>
    </Flex>
  );
}

export default App;
