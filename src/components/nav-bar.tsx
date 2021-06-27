import * as React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { MdMenu, MdShoppingBasket } from 'react-icons/md'
import Cart from 'src/components/cart'

const NavBar = () => {
  return (
    <Flex flexDir='row' justifyContent='space-between' alignItems='center' p='2rem' backgroundColor='#FFA8E2'>
      <Icon fill='white' as={MdMenu} cursor='pointer' w={30} h={30} />
      <Text fontSize="4xl" as="samp">Couture</Text>
      <Cart />
    </Flex>
  )
}

export default NavBar