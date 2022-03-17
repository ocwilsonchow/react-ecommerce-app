import React from 'react'
import {Flex,useColorModeValue } from '@chakra-ui/react'

const PagesHome = () => {
  const bgColor = useColorModeValue('#F4F4F4', '#161633')
  return (
    <Flex bg={bgColor} w="100%">
      Home
    </Flex>
  )
}

export default PagesHome
