export const FETCH_PRODUCT = `query getProductById($slug: String!) {
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
    images(first: 1) {
      edges {
        node {
          src
          altText
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

export const FETCH_ALL = `query getProductList {
          products(first: 100) {
            edges {
              node {
                id
                handle
                description
                title
                productType
                totalInventory
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      quantityAvailable
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
              }
            }
          }
        }`;
