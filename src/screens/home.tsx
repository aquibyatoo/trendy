import Product from "src/components/product";
import { Grid } from "@chakra-ui/react";
import { GetAllProduct as ProductType } from "types/product";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";

type HomeScreenProps = {
  products: ProductType[];
};

const HomeScreen = (props: HomeScreenProps) => {
  if (!props.products) return <h1>Failed to fetch products!</h1>;

  return (
    <Layout>
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {props.products.map((product) => (
          <Product product={product.node} key={product.node.id} />
        ))}
      </Grid>
    </Layout>
  );
};

export default withContext(HomeScreen);
