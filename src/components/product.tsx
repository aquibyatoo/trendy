import * as React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { Product as ProductType } from 'types/product'
import Link from 'next/link'

type ProductProps = {
  product: ProductType
}

const Product = (props: ProductProps) => {
  const { product: { title, images, handle, ...rest } } = props

  return (
    <Link href={`/${handle}`}>
      <Box cursor='pointer'>
        <Image src={images[0].src} />
        <Text>{title}</Text>
      </Box>
    </Link>
  )
}

export default Product