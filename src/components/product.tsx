import * as React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import ProductType from 'types'

type ProductProps = {
  product: ProductType
}

const Product = (props: ProductProps) => {
  const { product: { title, images } } = props
  return (
    <Box>
      <Image src={images[0].src} />
      <Text>{title}</Text>
    </Box>
  )
}

export default Product