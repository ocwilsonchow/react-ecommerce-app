import React from 'react'
import { Flex, Text, Center, useColorModeValue } from '@chakra-ui/react'

const Categories = () => {
      const bgColor = useColorModeValue('#F4F4F4', '#13031F');


  return (
    <Flex w="100%" bg={bgColor}>
     <Center w="100%">
        <Text fontWeight="bold" fontSize="4xl">Categories Page is still under development</Text>
     </Center>
    </Flex>
  )
}

export default Categories
