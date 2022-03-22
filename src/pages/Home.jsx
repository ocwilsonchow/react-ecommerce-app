import React from 'react'
import {Flex,VStack,useColorModeValue, Image } from '@chakra-ui/react'
import Products from '../components/Products'
import Categories from '../components/Categories'

const PagesHome = () => {
  const bgColor = useColorModeValue('#f5f5f5', '#161633')
  return (
    <Flex flexDir="column" bg={bgColor} w="100%" h="100vh" overflow="auto">
      <Categories />
      <Products />
    </Flex>
  )
}

export default PagesHome
