import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import Visa from "../images/visa.svg"
import MasterCard from "../images/master-card.svg"
import Discover from "../images/discover.svg"
import AmericanExpress from "../images/american-express.svg"
import DinersClub from "../images/diners-club.svg"
import Jcb from "../images/jcb.svg"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const CloudinaryImage = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     visa: file(name: { eq: "visa" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //     masterCard: file(name: { eq: "master-card" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //     discover: file(name: { eq: "discover" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //     americanExpress: file(name: { eq: "american-express" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //     dinersClub: file(name: { eq: "diners-club" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //     jcb: file(name: { eq: "jcb" }) {
  //       childCloudinaryAsset {
  //         fluid(maxWidth: 80) {
  //           ...CloudinaryAssetFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <div>
      <img src={Visa} />
      <img src={MasterCard} />
      <img src={Discover} />
      <img src={AmericanExpress} />
      <img src={DinersClub} />
      <img src={Jcb} />
    </div>
  )
}

export default CloudinaryImage
