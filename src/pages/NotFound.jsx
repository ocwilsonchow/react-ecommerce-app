import React from 'react'
import { Flex, Text, Center, useColorModeValue } from '@chakra-ui/react'


function PagesNotFound() {
    const bgColor = useColorModeValue('#F4F4F4', '#13031F');


  return (
     <Flex w="100%" bg={bgColor}>
     <Center w="100%">
        <Text fontWeight="bold" fontSize="4xl" p={10}>Page Not Found!</Text>
     </Center>
    </Flex>
  )
}

export default PagesNotFound
