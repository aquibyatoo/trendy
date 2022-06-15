import { Grid, Image, Button, Text, Box } from "@chakra-ui/react";
import * as React from "react";
import { useCart } from "src/context/cart-context";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";
import { client } from "src/utils/api-client";
import { getCheckoutId } from "src/utils/checkout";
import { Product as ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

const Product = (props: ProductProps) => {
  const {
    product: { images, description, id, title, variants, handle },
  } = props;

  // @ts-ignore
  const { onOpen } = useCart();

  const addProductToCheckout = async () => {
    const variantId = variants[0].id;
    const lineItems = [
      {
        variantId,
        quantity: 1,
      },
    ];

    const checkoutId = getCheckoutId() || ""; // todo

    const checkout = await client.checkout
      .addLineItems(checkoutId, lineItems)
      .catch((err) => console.log(err));
    onOpen();
  };

  const PRODUCT_QUERY = `query getProductById($slug: String!) {
    product(handle: $slug) {
      title
      id
      variants(first: 5) {
        edges {
            node {
                id
                title
                priceV2 {
                amount
                currencyCode
                }
            }
        }
    }
    requiresSellingPlan
    sellingPlanGroups(first: 1) {
        edges {
        node {
            name
            options {
                name
                values
            }
            sellingPlans(first: 10) {
            edges {
                node {
                id
                name
                description
                recurringDeliveries
                priceAdjustments {
                    orderCount
                    adjustmentValue {
                    __typename
                    ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                    }
                    ... on SellingPlanFixedAmountPriceAdjustment {
                        adjustmentAmount {
                        amount
                        currencyCode
                        }
                    }
                    ... on SellingPlanFixedPriceAdjustment {
                        price {
                        amount
                        currencyCode
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }
        }
      }
  }`;

  const fetchAProduct = () => {
    const URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2022-04/graphql.json`;

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_API || "",
      },
      body: JSON.stringify({
        query: PRODUCT_QUERY,
        variables: { slug: handle },
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log("data returned:", data));
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Image src={images[0].src} alt={title}></Image>
        </Box>
        <Box p="2rem">
          <Text fontSize="2xl">{title}</Text>
          <Text>{variants[0].price}</Text>
          <Text>{description}</Text>
          <Button onClick={addProductToCheckout}>Add to cart</Button>
        </Box>
      </Grid>
      <Button onClick={fetchAProduct}>
        <Text>Fetch a product</Text>
      </Button>
    </Layout>
  );
};

export default withContext(Product);
