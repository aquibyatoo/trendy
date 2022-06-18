import { request } from "src/utils/client";
import { CHECKOUT_URL } from "./graphql/queries/checkout";

type CheckoutResponse = {
  data: {
    cart: {
      checkoutUrl: string;
    };
  };
};

export async function createCheckoutUrl(cartId: string) {
  const response = await request<CheckoutResponse>({
    variables: { cartId },
    body: CHECKOUT_URL,
  });

  return response.data.cart.checkoutUrl;
}
