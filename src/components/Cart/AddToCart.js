import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import { Button } from "../styles/StyledButton"

const AddToCart = ({ variantId, cloudinaryImgUrl }) => {
  const { addProductToCart, checkout } = useContext(StoreContext)
  console.log("TCL: AddToCart -> checkout", checkout)
  return (
    <Button
      cta
      border="none"
      borderRadius={1}
      color="white"
      p={2}
      onClick={() => addProductToCart(variantId, cloudinaryImgUrl)}
    >
      Add To Cart
    </Button>
  )
}

export default AddToCart
