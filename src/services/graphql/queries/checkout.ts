export const CHECKOUT_URL = `query getCheckoutUrl($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }`;
