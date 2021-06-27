import { Grid, Image, Button, Text, Box } from '@chakra-ui/react'
import * as React from 'react'
import { useCart } from 'src/context/cart-context'
import Layout from 'src/hocs/layout'
import withContext from 'src/hocs/with-context'
import { client } from 'src/utils/api-client'
import { getCheckoutId } from 'src/utils/checkout'
import { Product as ProductType } from 'types/product'

type ProductProps = {
  product: ProductType
}

const Product = (props: ProductProps) => {
  const { product: { images, description, id, title, variants } } = props
  // @ts-ignore
  const { onOpen } = useCart()

  const addProductToCheckout = async () => {
    const variantId = variants[0].id
    const lineItems = [{
      variantId,
      quantity: 1
    }]

    const checkoutId = getCheckoutId() || "" // todo 

    const checkout = await client.checkout.addLineItems(checkoutId, lineItems).catch(err => console.log(err))
    onOpen()
  }

  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Image src={images[0].src}></Image>
        </Box>
        <Box p='2rem'>
          <Text fontSize='2xl'>{title}</Text>
          <Text>{variants[0].price}</Text>
          <Text>{description}</Text>
          <Button onClick={addProductToCheckout}>Add to cart</Button>
        </Box>
      </Grid>
    </Layout>
  )
}

export default withContext(Product)