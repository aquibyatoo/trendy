import * as React from 'react'
import Head from 'next/head'
import Product from 'src/components/product'
import { Grid } from '@chakra-ui/react'
import { Product as ProductType } from 'types/product'
import NavBar from 'src/components/nav-bar'

type HomeScreenProps = {
  products: [ProductType]
}

const HomeScreen = (props: HomeScreenProps) => (
  <div>
    <Head>
      <title>Trendy</title>
      <meta name="description" content="Trending around you!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <main className="main">
      <Grid templateColumns="repeat(3, 1fr)">
        {
          props.products.map(product => <Product product={product} key={product.id} />)
        }
      </Grid>
    </main>
  </div>
)

export default HomeScreen
