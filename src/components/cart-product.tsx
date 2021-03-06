import * as React from "react";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Product as ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

const CartProduct = (props: ProductProps) => {
  const {
    product: { title, images, variants },
  } = props;

  const getImage = () => {
    return (
      images.edges[0]?.node.src ||
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    );
  };

  const getPrice = () => {
    return variants.edges[0]?.node.priceV2.amount;
  };

  return (
    <Box display={"flex"} mb={4}>
      <Image src={getImage()} alt={title} width={160} mr={8} />
      <Box>
        <Heading as="h6" size="xs" pb={2}>
          {title}
        </Heading>
        <Text fontWeight={700}>${getPrice()}</Text>
      </Box>
    </Box>
  );
};

export default CartProduct;
