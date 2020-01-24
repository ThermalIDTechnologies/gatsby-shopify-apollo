import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import StickerOne from "../components/Stickers/StickerOne"

export const query = graphql`
  query($uid: String!) {
    prismic {
      allSticker_with_1_transformations(uid: $uid) {
        edges {
          node {
            sticker
            _meta {
              uid
            }
            sticker_text
            cloud_name
            public_id
            font_color
            font_family
            font_size
            gravity
            height
            width
            x
            y
          }
        }
      }
    }
  }
`

const StickerOneTemplate = ({ data }) => {
  const doc = data.prismic.allSticker_with_1_transformations.edges.slice(0, 1).pop()
  if (!doc) return null

  return (
    <Layout>
      <h1>{doc.node.sticker.title}</h1>
      <StickerOne doc={doc} />
    </Layout>
  )
}

export default StickerOneTemplate
