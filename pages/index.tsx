import HomeScreen from "src/screens/home";
import { GetServerSideProps } from "next";
import { fetchAllProducts } from "src/services/product";
import { Product } from "types/product";

type HomeProps = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchAllProducts().catch((err) => ({
    ...err,
    fetchError: true,
  }));

  if (products.fetchError) {
    return { props: { products: null } };
  }

  return {
    props: { products },
  };
};

export default function Home(props: HomeProps) {
  return <HomeScreen {...props} />;
}
