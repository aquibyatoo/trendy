import * as React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import Cart from 'src/components/cart'
import Link from 'next/link'
import { CartProvider } from 'src/context/cart-context'

const NavBar = () => {
  return (
    <Flex flexDir='row' justifyContent='space-between' alignItems='center' p='2rem' backgroundColor='#FFA8E2'>
      <Icon fill='white' as={MdMenu} cursor='pointer' w={30} h={30} />
      <Link href='/'>
        <Text fontSize="4xl" as="samp" cursor='pointer'>Couture</Text>
      </Link>
      <CartProvider>
        <Cart />
      </CartProvider>
    </Flex>
  )
}

export default NavBar