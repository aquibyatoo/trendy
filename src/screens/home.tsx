import Product from "src/components/product";
import { Grid } from "@chakra-ui/react";
import { Product as ProductType } from "types/product";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";

type HomeScreenProps = {
  products: [ProductType];
};

const HomeScreen = (props: HomeScreenProps) => (
  <Layout>
    <Grid templateColumns="repeat(3, 1fr)" gap={8}>
      {props.products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </Grid>
  </Layout>
);

export default withContext(HomeScreen);
