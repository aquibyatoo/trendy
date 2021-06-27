import { Grid, Image, Button, Text, Box } from '@chakra-ui/react'
import * as React from 'react'
import Layout from 'src/hocs/layout'
import { Product as ProductType } from 'types/product'

type ProductProps = {
  product: ProductType
}

const Product = (props: ProductProps) => {
  const { product: { images, description, id, title, variants } } = props

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
          <Button>Add to cart</Button>
        </Box>
      </Grid>
    </Layout>
  )
}

export default Product