import Product from 'src/components/product'
import { Grid } from '@chakra-ui/react'
import { Product as ProductType } from 'types/product'
import Layout from 'src/hocs/layout'

type HomeScreenProps = {
  products: [ProductType]
}

const HomeScreen = (props: HomeScreenProps) => (
  <Layout>
    <Grid templateColumns="repeat(3, 1fr)">
      {
        props.products.map(product => <Product product={product} key={product.id} />)
      }
    </Grid>
  </Layout>
)

export default HomeScreen
