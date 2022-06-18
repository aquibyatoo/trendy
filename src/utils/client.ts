type RequestParams = {
  body: any;
  variables?: any;
};

const URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2022-04/graphql.json`;

export function request<R>(params: RequestParams): Promise<R> {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_API || "",
    },
    body: JSON.stringify({
      query: params.body,
      variables: params.variables,
    }),
  }).then((res) => res.json());
}
