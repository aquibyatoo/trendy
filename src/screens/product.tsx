import { Grid, Image, Button, Text, Box } from "@chakra-ui/react";
import * as React from "react";
import Layout from "src/hocs/layout";
import withContext from "src/hocs/with-context";
import { Product as ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

const Product = (props: ProductProps) => {
  const {
    product: { images, description, title, variants, handle },
  } = props;

  const [isLoading, onLoading] = React.useState(false);

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

  const CREATE_CART_MUTATION = `mutation createCart($input: CartInput) {
      cartCreate(
        input: $input
      ) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          attributes {
            key
            value
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }`;

  const CHECKOUT_URL_QUERY = `query getCheckoutUrl($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }`;

  const URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2022-04/graphql.json`;

  const fetchProduct = async () => {
    const response = await fetch(URL, {
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
    }).then((r) => r.json());

    return response.data.product;
  };

  const createCartInput = (product: any) => {
    console.log(product);
    const variant = product.variants.edges[0].node;
    const sellingPlanGroups = product.sellingPlanGroups.edges[0]?.node;
    const sellingPlanId = sellingPlanGroups
      ? sellingPlanGroups.sellingPlans.edges[0].node.id
      : "";

    const lineProduct: any = {
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

  const createCartId = async (input: any) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_API || "",
      },
      body: JSON.stringify({
        query: CREATE_CART_MUTATION,
        variables: { input },
      }),
    }).then((r) => r.json());

    return response.data.cartCreate.cart.id;
  };

  const fetchCheckoutUrl = async (cartId: string) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_API || "",
      },
      body: JSON.stringify({
        query: CHECKOUT_URL_QUERY,
        variables: { cartId },
      }),
    }).then((r) => r.json());

    return response.data.cart.checkoutUrl;
  };

  const openCheckoutInNewTab = (checkoutUrl: string) => {
    const newWindow = window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleQuickBuy = async () => {
    onLoading(true);

    const product = await fetchProduct();
    const cartInput = createCartInput(product);
    const cartId = await createCartId(cartInput);
    const checkoutUrl = await fetchCheckoutUrl(cartId);

    onLoading(false);

    openCheckoutInNewTab(checkoutUrl);
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
        </Box>
      </Grid>
    </Layout>
  );
};

export default withContext(Product);
