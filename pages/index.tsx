import HomeScreen from 'src/screens/home'
import { client } from 'src/utils/api-client';

export const getServerSideProps = async (ctx) => {
  const products = await client.product.fetchAll().catch(err => console.log({ err }))

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }

}

export default function Home({ products }) {
  return (
    <HomeScreen products={products} />
  )
}
