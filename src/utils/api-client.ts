// @ts-ignore
import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_API
});
