import { useDisclosure } from '@chakra-ui/react'
import * as React from 'react'

const CartContext = React.createContext({})

CartContext.displayName = 'CartContext'
const CartProvider = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    < CartContext.Provider value={{ isOpen, onOpen, onClose }} {...props} />
  )
}

function useCart() {
  return React.useContext(CartContext)
}

export { CartProvider, useCart }
