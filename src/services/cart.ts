import { request } from "src/utils/client";
import { CREATE_CART } from "./graphql/mutations/cart";

export type LineProduct = {
  quantity: number;
  merchandiseId: string;
  sellingPlanId?: string;
};

type AttributeProduct = {
  key: string;
  value: string;
};

type CartInput = {
  lines: LineProduct[];
  attributes: AttributeProduct;
};

type Cart = {
  id: string;
};

type CartResponse = {
  data: {
    cartCreate: {
      cart: Cart;
    };
  };
};

export async function createCart(input: CartInput) {
  const response = await request<CartResponse>({
    variables: { input },
    body: CREATE_CART,
  });

  return response.data.cartCreate.cart.id;
}
