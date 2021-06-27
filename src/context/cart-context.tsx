import * as React from 'react'
import { client } from 'src/utils/api-client'

const CartStateType = {
  isOpen: Boolean,
  checkoutId: String
}

const CartContext = React.createContext({})

CartContext.displayName = 'CartContext'
const CartProvider = ({ ...props }) => {
  const [cart, setCart] = React.useState(CartStateType)

  React.useEffect(() => {
    if (!localStorage.checkout_id) {
      generateCheckoutId()
    }
  }, [])

  const generateCheckoutId = async () => {
    const checkout: any = await client.checkout.create().catch(err => console.log(err))

    localStorage.setItem('checkout_id', checkout.id)
  }

  return (
    < CartContext.Provider value={cart} {...props} />
  )
}

function useCart() {
  return React.useContext(CartContext)
}

export { CartProvider, useCart }

