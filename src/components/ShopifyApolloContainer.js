import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import ShopifyVariantGetter from "./shopifyVariantGetter"

const SHOPIFY_QUERY = gql`
  query($handle: String!) {
    productByHandle(handle: $handle) {
      options {
        id
        name
        values
      }
      variants(first: 10) {
        edges {
          node {
            availableForSale
            id
            priceV2 {
              amount
            }
            sku
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

export const ShopifyApolloContainer = ({ handle }) => {
  const { loading, error, data } = useQuery(SHOPIFY_QUERY, {
    variables: { handle },
  })

  return (
    <>
      <ShopifyVariantGetter loading={loading} error={error} data={data} handle={handle} />
    </>
  )
}

export default ShopifyApolloContainer