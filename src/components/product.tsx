import * as React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import { Product as ProductType } from "types/product";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
};

const Product = (props: ProductProps) => {
  const {
    product: { title, images, handle },
  } = props;

  const getImage = () => {
    if (images && images.length > 0) {
      return images[0].src;
    }

    return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
  };

  return (
    <Link href={`/${handle}`} passHref>
      <Box cursor="pointer">
        <Image src={getImage()} alt={title} />
        <Heading as="h6" size="xs" pt={2}>
          {title}
        </Heading>
      </Box>
    </Link>
  );
};

export default Product;
