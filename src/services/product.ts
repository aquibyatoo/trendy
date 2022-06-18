import { request } from "src/utils/client";
import { Product } from "types/product";
import { FETCH_PRODUCT } from "./graphql/queries/product";

type FetchProductResponse = {
  data: {
    product: Product;
  };
};

export const fetchAllProducts = () => [];

export const fetchProduct = async (handle: string): Promise<Product> => {
  const variables = { slug: handle };

  const response = await request<FetchProductResponse>({
    body: FETCH_PRODUCT,
    variables,
  });

  return response.data.product;
};
