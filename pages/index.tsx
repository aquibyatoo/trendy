import HomeScreen from 'src/screens/home'
import { client } from 'src/utils/api-client';
import { Product } from 'types/product';

type HomeProps = {
  products: [Product]
}

export const getServerSideProps = async () => {
  const products = await client.product.fetchAll().catch(err => console.log({ err }))

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }

}

export default function Home(props: HomeProps) {
  return (
    <HomeScreen products={props.products} />
  )
}
