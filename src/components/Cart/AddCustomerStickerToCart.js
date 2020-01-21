import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import { Button } from "../styles/StyledButton"

const AddCustomerStickerToCart = ({
  variantId,
  cloudinaryImgUrl,
  publicId,
  originalFilename,
}) => {
  const { addCustomerStickerToCart, checkout } = useContext(StoreContext)
  console.log("TCL: AddToCart -> checkout", checkout)
  return (
    <Button
      cta
      border="none"
      borderRadius={1}
      color="white"
      p={2}
      onClick={() =>
        addCustomerStickerToCart(
          variantId,
          cloudinaryImgUrl,
          publicId,
          originalFilename
        )
      }
    >
      Add To Cart
    </Button>
  )
}

export default AddCustomerStickerToCart
