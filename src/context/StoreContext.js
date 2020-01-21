import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "test-sticker-store.myshopify.com",
  storefrontAccessToken: "000a9c2e4a234b4136ac100f584f8378",
})

const defaultValues = {
  isCartOpen: false,
  isNavOpen: false,
  toggleCartOpen: () => {},
  toggleNavOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  addCustomerStickerToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  removeCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
  selectedVariant: "",
}

export const StoreContext = createContext(defaultValues)

// Check if there is a browser
const isBrowser = typeof window != "undefined"

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isNavOpen, setNavOpen] = useState(false)
  const [customText, setCustomText] = useState("")
  const [selectedVariant, setSelectedVariant] = useState()

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)
  const toggleNavOpen = () => setNavOpen(!isNavOpen)

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        // Check if Id exists
        const currentCheckoutId = isBrowser
          ? localStorage.getItem("checkout_id")
          : null
  
        let newCheckout = null
  
        if (currentCheckoutId) {
          // If Id exists, fetch checkout from Shopify
          newCheckout = await client.checkout.fetch(currentCheckoutId)
          if (newCheckout.completedAt) {
            newCheckout = await getNewId()
          }
        } else {
          // If Id does not, create new checkout
          newCheckout = await getNewId()
        }
  
        // Set checkout to state
        setCheckout(newCheckout)
      } catch (e) {
        console.error(e)
      }
    }

    initializeCheckout()
  }, [])

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout
    } catch (e) {
      console.error(e)
    }
  }

  const addProductToCart = async (variantId, cloudinaryImgUrl) => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [
            { 
              key: "_Cloudinary Image URL", 
              value: `${cloudinaryImgUrl}` 
            },
            {
              key: "_myKey",
              value: "_myValue"
            }
          ],
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
      setSelectedVariant()
    } catch (e) {
      console.error(e)
    }
  }

  const addCustomerStickerToCart = async (variantId, cloudinaryImgUrl, publicId, originalFilename) => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [
            { 
              key: "_Cloudinary Image URL", 
              value: `${cloudinaryImgUrl}` 
            },
            {
              key: "_Public ID",
              value: `${publicId}`
            },
            {
              key: "Uploaded File Name",
              value: `${originalFilename}`
            },
          ],
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
      setSelectedVariant()
    } catch (e) {
      console.error(e)
    }
  }

  const removeProductFromCart = async lineItemId => {
    console.log("TCL: StoreProvider -> lineItemId", lineItemId)
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])
      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  const checkCoupon = async coupon => {
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
    setCheckout(newCheckout)
  }

  const removeCoupon = async coupon => {
    const newCheckout = await client.checkout.removeDiscount(checkout.id, coupon)
    setCheckout(newCheckout)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        addCustomerStickerToCart,
        removeProductFromCart,
        toggleCartOpen,
        toggleNavOpen,
        isCartOpen,
        isNavOpen,
        customText,
        setCustomText,
        selectedVariant,
        setSelectedVariant,
        checkCoupon,
        removeCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
