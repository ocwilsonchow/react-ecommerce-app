import React from 'react';
import { Center,Box,Image, Flex, VStack, Button, Text, Input, Avatar, HStack, useColorModeValue, IconButton, Circle, Checkbox } from '@chakra-ui/react';
import {MinusIcon} from '@chakra-ui/icons'

const RightBar = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#1D213C')
  const secondaryBgColor = useColorModeValue('#FBF1F2', '#222D48')
  const tertiaryBgColor = useColorModeValue('#32343B', '#222D48')


  const cartItems = [
    {
      name: "Item One",
      price: "590",
      currency: 'HKD',
      id: 1,
      imgURL: "https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg"
    },
    {
      name: "Item One",
      price: "590",
      currency: 'HKD',
      id: 2,
      imgURL: "https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg"
    },
    {
      name: "Item One",
      price: "590",
      currency: 'HKD',
      id: 3,
      imgURL: "https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg"
    },
     {
      name: "Item One",
      price: "590",
      currency: 'HKD',
      id: 4,
      imgURL: "https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg"
    },

  ]

  return (
    <Flex flexDir="column" alignItems="center" bg={bgColor} h="100%">
        <Flex w="80%" py={5} m={2} alignItems="center" justifyContent="space-evenly">
          <Input bg={secondaryBgColor} border="none" borderRadius="1rem"  mr={5} placeholder="Search"/>
          <Avatar  bg="teal.500"/>
        </Flex>
        <Flex bg={secondaryBgColor} w="80%" p={5} h="200px" borderRadius="1rem" m={2}>
          <Text></Text>
        </Flex>

        {/* Shopping Cart */}
        <Flex flexDir="column" w="80%" my={3} maxH="45vh" overflow="auto">

          <Text fontWeight="bold" my={2}>My Shopping Cart</Text>
          {cartItems.map((item) => (
            <Flex key={item.id} bg={tertiaryBgColor} p={2} borderRadius="1.5rem" my={2} alignItems="center" justifyContent="space-between">
              <Flex>
                <Image width="50px" height="50px" src={item.imgURL} borderRadius="1rem" mr={5}/>
              <Flex flexDir="column">
                <Text color="white" fontWeight="bold">{item.name}</Text>
                 <HStack>
                   <Circle size='10px' bg='tomato'/>
                    <Text color="white">{item.currency}{" "}{item.price}</Text>
                 </HStack>
              </Flex>
              </Flex>
              <IconButton color="white" size='xs' variant="ghost" icon={<MinusIcon />}/>
            </Flex>
          ))}
        </Flex>

        {/* Hot Add-on */}
        <Flex flexDir="column" w="80%" my={3} maxH="45vh" overflow="auto">
           <Text fontWeight="bold" my={2}>Trending Add-ons</Text>
            <Flex bg={tertiaryBgColor} p={2} borderRadius="1.5rem" my={2} alignItems="center" justifyContent="space-between">

              <Flex>
                <Image width="50px" height="50px" src="https://lesson-restful.s3.ap-northeast-2.amazonaws.com/9d1af71df46cf288b2ace8c01.jpg" borderRadius="1rem" mr={5}/>
              <Flex flexDir="column">
                <Text color="white" fontWeight="bold">Item</Text>
                 <HStack>
                   <Circle size='10px' bg='blue.500'/>
                    <Text color="white">HKD 900</Text>
                 </HStack>
              </Flex>
              </Flex>
              <Checkbox mr={2} />
            </Flex>
        </Flex>


        {/* Checkout button */}
        <Button size="lg" w="80%" my={3} borderRadius="2rem"  color="white" fontWeight="bold" bgGradient='linear(to-r, #7192E2, #3961C3)'>Check Out</Button>



    </Flex>
  );
};

export default RightBar;
