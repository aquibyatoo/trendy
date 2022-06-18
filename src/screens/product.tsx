import { Grid, Image, Button, Text, Box } from "@chakra-ui/react";
import * as React from "react";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";
import { createCart, LineProduct } from "src/services/cart";
import { createCheckoutUrl } from "src/services/checkout";
import { fetchProduct } from "src/services/product";
import { Product as ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

const Product = (props: ProductProps) => {
  const {
    product: { images, description, title, variants, handle },
  } = props;

  const [isLoading, onLoading] = React.useState(false);
  const [fetchError, onFetchError] = React.useState(false);

  const createCartInput = (product: any) => {
    const variant = product.variants.edges[0].node;
    const sellingPlanGroups = product.sellingPlanGroups.edges[0]?.node;
    const sellingPlanId = sellingPlanGroups
      ? sellingPlanGroups.sellingPlans.edges[0].node.id
      : "";

    const lineProduct: LineProduct = {
      quantity: 1,
      merchandiseId: variant.id,
    };

    if (sellingPlanId) lineProduct["sellingPlanId"] = sellingPlanId;

    return {
      lines: [lineProduct],
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute",
      },
    };
  };

  const openCheckoutInNewTab = (checkoutUrl: string) => {
    const newWindow = window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleQuickBuy = async () => {
    onLoading(true);
    fetchError && onFetchError(false);

    try {
      const product = await fetchProduct(handle);
      const cartInput = createCartInput(product);
      const cartId = await createCart(cartInput);
      const checkoutUrl = await createCheckoutUrl(cartId);

      openCheckoutInNewTab(checkoutUrl);
    } catch (error) {
      onFetchError(true);
    }

    onLoading(false);
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Image src={images[0].src} alt={title}></Image>
        </Box>
        <Box p="2rem">
          <Text fontSize="2xl">{title}</Text>
          <Text fontWeight={700}>${variants[0].price}</Text>
          <Text>{description}</Text>
          <Button
            onClick={handleQuickBuy}
            isLoading={isLoading}
            mt={6}
            colorScheme="teal"
            size="lg"
          >
            Quick Buy
          </Button>
          {fetchError && (
            <Text colorScheme={"orange"}>Failed to checkout. Try again!</Text>
          )}
        </Box>
      </Grid>
    </Layout>
  );
};

export default withContext(Product);
