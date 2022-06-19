import ProductScreen from "src/screens/product";
import { Product as ProductType } from "types/product";
import { GetServerSideProps } from "next";
import { fetchProduct } from "src/services/product";

type ProductProps = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const product = await fetchProduct(params?.id as string).catch((err) => ({
    ...err,
    fetchError: true,
  }));

  if (product.fetchError) {
    return { props: { product: null } };
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};

export default function Home(props: ProductProps) {
  if (!props.product === null) return <div>Failed to fetch product</div>;

  return <ProductScreen {...props} />;
}
