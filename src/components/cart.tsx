import * as React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Icon
} from "@chakra-ui/react"
import { MdShoppingBasket } from 'react-icons/md'
import { useCart } from 'src/context/cart-context'
import { client } from 'src/utils/api-client'


const ShoppingCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { checkoutId } = useCart()

  // fetch inline items here
  return (
    <>
      <Icon fill='white' as={MdShoppingBasket} cursor='pointer' w={30} h={30} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your shopping cart</DrawerHeader>

          <DrawerBody>
            <Text>Cart items</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button w={'100%'}>Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ShoppingCart