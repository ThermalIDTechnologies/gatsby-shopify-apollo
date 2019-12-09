import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId }) => {
  const { addProductToCart, checkout } = useContext(StoreContext)
  console.log("TCL: AddToCart -> checkout", checkout)
  return (
    <button
      onClick={() => addProductToCart(variantId)}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart
