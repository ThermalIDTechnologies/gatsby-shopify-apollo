import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ShopifyApolloContainer from "../components/shopifyApolloContainer"

const ProductDetailTemplate = ({ data }) => {
  const doc = data.prismic.allProducts.edges.slice(0, 1).pop()
  if (!doc) return null

  console.log(doc.node._meta.uid)

  return (
    <Layout>
      <h1>{doc.node.sticker.title}</h1>
      <ShopifyApolloContainer handle={doc.node._meta.uid} />
    </Layout>
  )
}

export default ProductDetailTemplate

export const query = graphql`
  query($uid: String!) {
    prismic {
      allProducts(uid: $uid) {
        edges {
          node {
            sticker
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`
