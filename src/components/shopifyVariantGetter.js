import React, { useState } from "react"
import VariantSelector from "./VariantSelector"
import AddToCart from "./Cart/AddToCart"

const ShopifyVariantGetter = ({ loading, error, data, handle }) => {
  const [selectedOptions] = useState({})
  const [selectedVariant, setSelectedVariant] = useState()

  // useComponentDidMount(() => console.log("didMount"))

  // useEffect(() => {
  //   data.productByHandle.options.forEach(selector => {
  //     setSelectedOptions(oldSelectedOptions => ({
  //       ...oldSelectedOptions,
  //       [selector.name]: selector.values[0],
  //     }))
  //   })
  // }, [])

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

  console.log(selectedVariant)

  console.log(data)

  // const hasVariants =
  //   data && (data.productByHandle.variants.edges || []).length > 0

  const hasOptions = data && (data.productByHandle.options || []).length > 0

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      {loading && <p>Loading variants...</p>}
      {error && (
        <pre style={{ overflowX: "scroll" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
      {hasOptions
        ? data.productByHandle.options.map(option => (
            <VariantSelector
              handleOptionChange={handleOptionChange}
              key={option.id}
              option={option}
            />
          ))
        : !loading && <p>No variants found matching "{handle}".</p>}
      {selectedVariant ? (
        <p>{Number(selectedVariant.node.priceV2.amount).toFixed(2)}</p>
      ) : (
        <p>-Price-</p>
      )}
      {selectedVariant ? (
        <AddToCart variantId={selectedVariant.node.id} />
      ) : null}
    </div>
  )
}

export default ShopifyVariantGetter
