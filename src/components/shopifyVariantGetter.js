import React, { useState, useContext } from "react"
import VariantSelector from "./VariantSelector"
import SkeletonLoader from "tiny-skeleton-loader-react"
import { StoreContext } from "./../context/StoreContext"
import {
  InputContainer,
  Label,
  ButtonWrapper,
  Price,
} from "./styles/StyledProduct"
import { useSpring } from "react-spring"

const ShopifyVariantGetter = ({
  loading,
  error,
  data,
  handle,
  children,
}) => {
  const [selectedOptions] = useState({})
  const { selectedVariant, setSelectedVariant } = useContext(StoreContext)

  const handleOptionChange = e => {
    e.preventDefault()
    const target = e.target
    selectedOptions[target.name] = target.value

    const variantSelected = data.productByHandle.variants.edges.find(
      variant => {
        return variant.node.selectedOptions.every(selectedOption => {
          console.log(
            "TCL: ProductDetailTemplate -> selectedOption",
            selectedOption
          )
          return selectedOptions[selectedOption.name] === selectedOption.value
        })
      }
    )

    setSelectedVariant(variantSelected)
    console.log(
      "TCL: ProductDetailTemplate -> selectedVariant",
      selectedVariant
    )
  }

  const buttonFade = useSpring({
    opacity: selectedVariant ? 1 : 0,
    height: selectedVariant ? 50.4 : 0,
  })

  const hasOptions = data && (data.productByHandle.options || []).length > 0

  return (
    <div>
      {loading && <SkeletonLoader width="35%" />}
      {error && (
        <pre style={{ overflowX: "scroll" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
      <InputContainer>
        {hasOptions
          ? data.productByHandle.options.map(option => (
              <div>
                <Label htmlFor={option.name}>{option.name}</Label>
                <VariantSelector
                  handleOptionChange={handleOptionChange}
                  key={option.id}
                  option={option}
                />
              </div>
            ))
          : !loading && <p>No variants found matching "{handle}".</p>}
      </InputContainer>
      {selectedVariant ? (
        <Price>${Number(selectedVariant.node.priceV2.amount).toFixed(2)}</Price>
      ) : (
        <Price>-Price-</Price>
      )}
      <ButtonWrapper style={buttonFade}>{children}</ButtonWrapper>
    </div>
  )
}

export default ShopifyVariantGetter
