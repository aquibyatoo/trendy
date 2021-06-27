import { client } from "./api-client"

export const generateCheckoutId = async () => {
  const checkout: any = await client.checkout.create().catch(err => console.log(err))

  localStorage.setItem('checkout_id', checkout.id)
}

export const getCheckoutId = () => localStorage.getItem('checkout_id')