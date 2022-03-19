import React from 'react'
import {Flex,VStack,useColorModeValue, Image } from '@chakra-ui/react'
import Products from '../components/Products'
import Categories from '../components/Categories'

const PagesHome = () => {
  const bgColor = useColorModeValue('#F4F4F4', '#161633')
  return (
    <Flex flexDir="column" bg={bgColor} w="100%" h="100vh" overflow="auto">

      <Categories />
      <Products />
    </Flex>
  )
}

export default PagesHome
