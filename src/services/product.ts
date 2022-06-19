import { request } from "src/utils/client";
import { Product } from "types/product";
import { FETCH_ALL, FETCH_PRODUCT } from "./graphql/queries/product";

type FetchProductResponse = {
  data: {
    product: Product;
  };
};

type FetchProductsResponse = {
  data: {
    products: {
      edges: Product[];
    };
  };
};

export const fetchAllProducts = async () => {
  const response = await request<FetchProductsResponse>({ body: FETCH_ALL });

  return response.data.products.edges;
};

export const fetchProduct = async (handle: string): Promise<Product> => {
  const variables = { slug: handle };

  const response = await request<FetchProductResponse>({
    body: FETCH_PRODUCT,
    variables,
  });

  return response.data.product;
};
