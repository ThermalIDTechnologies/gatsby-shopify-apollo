import React, { useState, useContext } from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import ShopifyApolloContainer from "../components/ShopifyApolloContainer"
import AddCustomerStickerToCart from "./../components/Cart/AddCustomerStickerToCart"
import { StoreContext } from "../context/StoreContext"

import Layout from "../components/layout"
import SkeletonLoader from "tiny-skeleton-loader-react"
import {
  StickerUploadContainer,
  StickerUploadProcess,
  UploadedStickerImage,
} from "./../components/styles/StyledProduct"
import { useSpring, config } from "react-spring"

export const query = graphql`
  query($uid: String!) {
    prismic {
      allCustomer_uploaded_stickers(uid: $uid) {
        edges {
          node {
            sticker_type
            _meta {
              uid
            }
            title
          }
        }
      }
    }
  }
`

const CustomerUploadedSticker = ({ data }) => {
  const doc = data.prismic.allCustomer_uploaded_stickers.edges.slice(0, 1).pop()
  
  const { selectedVariant } = useContext(StoreContext)
  
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [publicId, setPublicId] = useState("")
  const [originalFilename, setOriginalFilename] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "stickers")
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/crjars/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
      const file = await res.json()
      console.log("TCL: SecondPage -> file", file)
      file.error ? setError(file.error.message) : setImage(file.secure_url)

      error === "" && setPublicId(file.public_id)
      error === "" && setOriginalFilename(file.original_filename)
      error === "" && setIsSubmitted(true)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const imgFade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.gentle,
  })

  if (!doc) return null

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>{doc.node.title[0].text}</h1>
      <StickerUploadProcess>
        <li>Upload the image you want to stickerize.</li>
        <li>Choose your size and quantity.</li>
        <li>Add to your cart and checkout.</li>
        <li>Sit back, relax, let us do the rest!</li>
      </StickerUploadProcess>
      <StickerUploadContainer>
        <input
          type="file"
          name="file"
          placeholder="Upload your image"
          onChange={uploadImage}
          style={{ zIndex: `10` }}
        />
        {image === "" && loading === false ? (
          <>
            <UploadedStickerImage
              style={imgFade}
              src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:best,w_400/v1575587390/ms-logo.svg"
            />
          </>
        ) : loading ? (
          <SkeletonLoader style={imgFade} width="300px" height="300px" />
        ) : (
          <>
            <UploadedStickerImage style={imgFade} src={image} />
          </>
        )}
        {error !== "" && <pre style={{ overflowX: "scroll" }}>{error}</pre>}
      </StickerUploadContainer>
      <ShopifyApolloContainer
        handle={doc.node._meta.uid}
        isSubmitted={isSubmitted}
      >
        {selectedVariant ? (
          <AddCustomerStickerToCart
            variantId={selectedVariant.node.id}
            cloudinaryImgUrl={image}
            publicId={publicId}
            originalFilename={originalFilename}
          />
        ) : null}
      </ShopifyApolloContainer>
    </Layout>
  )
}

CustomerUploadedSticker.query = query

export default CustomerUploadedSticker

// https://api.cloudinary.com/v1_1/crjars
