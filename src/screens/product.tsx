import { Grid, Image, Button, Text, Box } from "@chakra-ui/react";
import * as React from "react";
import { useCart } from "src/context/cart-context";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";
import { createCart, LineProduct } from "src/services/cart";
import { createCheckoutUrl } from "src/services/checkout";
import { openTab } from "src/utils/open-new-tab";
import { Product as ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

type Loader = boolean | "quickBuy" | "addToCart";

const Product = (props: ProductProps) => {
  const {
    product: {
      images,
      description,
      title,
      variants,
      handle,
      sellingPlanGroups,
    },
  } = props;

  const [isLoading, onLoading] = React.useState<Loader>(false);
  const [fetchError, onFetchError] = React.useState(false);
  const { addToCart, onOpen } = useCart();

  const createCartInput = () => {
    const variant = variants.edges[0].node;
    const sellingPlanList = sellingPlanGroups.edges[0]?.node;
    const sellingPlanId = sellingPlanList
      ? sellingPlanList.sellingPlans.edges[0].node.id
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

  const handleQuickBuy = async () => {
    onLoading("quickBuy");
    fetchError && onFetchError(false);

    try {
      const cartInput = createCartInput();
      const cartId = await createCart(cartInput);
      const checkoutUrl = await createCheckoutUrl(cartId);

      openTab(checkoutUrl);
    } catch (error) {
      onFetchError(true);
    }

    onLoading(false);
  };

  const handleAddToCart = () => {
    addToCart({
      images,
      description,
      title,
      variants,
      handle,
      sellingPlanGroups,
    });
    onOpen();
  };

  const getPrice = () => {
    return variants.edges[0]?.node.priceV2.amount;
  };

  const getImage = () => {
    return images.edges[0]?.node.src;
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Image src={getImage()} alt={title}></Image>
        </Box>
        <Box p="2rem">
          <Text fontSize="2xl">{title}</Text>
          <Text fontWeight={700}>${getPrice()}</Text>
          <Text>{description}</Text>

          <Button
            onClick={handleQuickBuy}
            isLoading={isLoading === "quickBuy"}
            mt={6}
            mr={6}
            colorScheme="teal"
            size="lg"
          >
            Quick Buy
          </Button>

          <Button
            onClick={handleAddToCart}
            isLoading={isLoading === "addToCart"}
            mt={6}
            colorScheme="teal"
            size="lg"
          >
            Add to Cart
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
