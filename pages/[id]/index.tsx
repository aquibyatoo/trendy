import ProductScreen from "src/screens/product";
import { client } from "src/utils/api-client";
import { Product as ProductType } from "types/product";
import { GetServerSideProps } from "next";

type ProductProps = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const product = await client.product
    .fetchByHandle(params.id)
    .catch((err) => console.log(err));

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};

export default function Home(props: ProductProps) {
  return <ProductScreen product={props.product} />;
}
