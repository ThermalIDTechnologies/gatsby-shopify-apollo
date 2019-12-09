import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "test-sticker-store.myshopify.com",
  storefrontAccessToken: "000a9c2e4a234b4136ac100f584f8378",
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  removeCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
  customText: "",
}

export const StoreContext = createContext(defaultValues)

// Check if there is a browser
const isBrowser = typeof window != "undefined"

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customText, setCustomText] = useState("")

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

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

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [{ key: "MyKey", value: `${customText}` }],
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
      // console.log(newCheckout.webUrl)
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
        removeProductFromCart,
        toggleCartOpen,
        isCartOpen,
        customText,
        setCustomText,
        checkCoupon,
        removeCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
