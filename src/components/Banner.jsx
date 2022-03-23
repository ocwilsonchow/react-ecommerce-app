import React from 'react'
import { Flex, Text, Center, Image, Button} from '@chakra-ui/react'

const Banner = () => {
  return (
    <Flex px='1rem' my={2} maxH={["180px","180px","180px","270px"]} maxW="1500px" position="relative">
      <Image borderRadius='1rem' objectFit='cover' src="https://firebasestorage.googleapis.com/v0/b/react-ecommerce-app-48eb1.appspot.com/o/images%2F11Art_SkinNtn_HydratingChiaFlower_0028_300dpi.jpg?alt=media&token=f0cfe2d5-3e60-40c2-a3f8-b7abe0858006"  />
      <Button position="absolute" right={["30px","30px","30px","70px"]} bottom="30px" display={{base: 'none', sm: 'block'}}  borderRadius="2rem">Discover Our Latest Offers</Button>
    </Flex>
  )
}

export default Banner
