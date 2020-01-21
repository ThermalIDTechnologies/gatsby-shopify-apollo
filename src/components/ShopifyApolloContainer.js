import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import ShopifyVariantGetter from "./shopifyVariantGetter"
import { VariantContainer } from "./styles/StyledProduct"
import { a, useSpring } from "react-spring"

const SHOPIFY_QUERY = gql`
  query($handle: String!) {
    productByHandle(handle: $handle) {
      options {
        id
        name
        values
      }
      variants(first: 250) {
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

export const ShopifyApolloContainer = ({ handle, isSubmitted, children }) => {
  const { loading, error, data } = useQuery(SHOPIFY_QUERY, {
    variables: { handle },
  })

  const variantFade = useSpring({
    overflow: "hidden",
    opacity: isSubmitted ? 1 : 0,
    height: isSubmitted ? 238 : 0,
  })

  return (
    <VariantContainer style={ variantFade }>
      <ShopifyVariantGetter
        loading={loading}
        error={error}
        data={data}
        handle={handle}
        isSubmitted={isSubmitted}
      >
        {children}
      </ShopifyVariantGetter>
    </VariantContainer>
  )
}

export default ShopifyApolloContainer

// import React, { useState } from "react"
// import { useQuery } from "@apollo/react-hooks"
// import gql from "graphql-tag"
// import VariantSelector from "./VariantSelector"
// import AddToCart from "./Cart/AddToCart"
// import SkeletonLoader from "tiny-skeleton-loader-react"
// import { InputContainer, Label, ButtonWrapper, VariantContainer } from "./styles/StyledProduct"
// import { useSpring } from "react-spring"

// const SHOPIFY_QUERY = gql`
//   query($handle: String!) {
//     productByHandle(handle: $handle) {
//       options {
//         id
//         name
//         values
//       }
//       variants(first: 100) {
//         edges {
//           node {
//             availableForSale
//             id
//             priceV2 {
//               amount
//             }
//             sku
//             selectedOptions {
//               name
//               value
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const ShopifyApolloContainer = ({ handle, image, isSubmitted }) => {
//   const { loading, error, data } = useQuery(SHOPIFY_QUERY, {
//     variables: { handle },
//   })

//   const [selectedOptions] = useState({})
//   const [selectedVariant, setSelectedVariant] = useState()

//   const handleOptionChange = e => {
//     e.preventDefault()
//     const target = e.target
//     selectedOptions[target.name] = target.value

//     const variantSelected = data.productByHandle.variants.edges.find(
//       variant => {
//         return variant.node.selectedOptions.every(selectedOption => {
//           console.log(
//             "TCL: ProductDetailTemplate -> selectedOption",
//             selectedOption
//           )
//           return selectedOptions[selectedOption.name] === selectedOption.value
//         })
//       }
//     )

//     setSelectedVariant(variantSelected)
//     console.log(
//       "TCL: ProductDetailTemplate -> selectedVariant",
//       selectedVariant
//     )
//   }

//   console.log(selectedVariant)

//   console.log(data)

//   const variantFade = useSpring({
//     opacity: isSubmitted ? 1 : 0,
//     height: isSubmitted ? 238 : 0,
//   })

//   const buttonFade = useSpring({
//     opacity: selectedVariant ? 1 : 0,
//     height: selectedVariant ? 34.4 : 0,
//   })

//   const hasOptions = data && (data.productByHandle.options || []).length > 0

//   return (
//     <VariantContainer style={variantFade}>
//       <div style={{ margin: "50px 0" }}>
//         {loading && <SkeletonLoader width="35%" />}
//         {error && (
//           <pre style={{ overflowX: "scroll" }}>
//             {JSON.stringify(error, null, 2)}
//           </pre>
//         )}
//         <InputContainer>
//           {hasOptions
//             ? data.productByHandle.options.map(option => (
//                 <div>
//                   <Label htmlFor={option.name}>{option.name}</Label>
//                   <VariantSelector
//                     handleOptionChange={handleOptionChange}
//                     key={option.id}
//                     option={option}
//                   />
//                 </div>
//               ))
//             : !loading && <p>No variants found matching "{handle}".</p>}
//         </InputContainer>
//         {selectedVariant ? (
//           <p>{Number(selectedVariant.node.priceV2.amount).toFixed(2)}</p>
//         ) : (
//           <p>-Price-</p>
//         )}
//           <ButtonWrapper style={buttonFade}>
//             {selectedVariant ? <AddToCart
//               variantId={selectedVariant.node.id}
//               cloudinaryImgUrl={image}
//             /> : null}
//           </ButtonWrapper>
//       </div>
//     </VariantContainer>
//   )
// }

// export default ShopifyApolloContainer
