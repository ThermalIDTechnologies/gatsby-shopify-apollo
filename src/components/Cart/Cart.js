import React, { useContext, useState } from "react"
import { animated } from "react-spring"
import { StoreContext } from "../../context/StoreContext"

import {
  CartContainer,
  CloseBtn,
  CouponForm,
  Label,
} from "../styles/StyledCart"
import { Button } from "../styles/StyledButton"
import ShopifyLogo from "../../images/shopify_logo_whitebg.svg"

const Cart = ({ style }) => {
  const {
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)
  console.log("TCL: Cart -> checkout", checkout)

  const [coupon, setCoupon] = useState("")

  return (
    <CartContainer as={animated.div} style={{ ...style }}>
      <CloseBtn onClick={toggleCartOpen}>X</CloseBtn>
      <h3 className="title">Cart</h3>
      {checkout.lineItems.length > 0 ? (
        <>
          {checkout.lineItems.map(item => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "2rem" }}
            >
              <div
                style={{
                  width: 100,
                  overflow: "hidden",
                  marginRight: 10,
                }}
              >
                <img
                  style={{ width: `100px` }}
                  src={item.customAttributes[0].value}
                  alt={item.title}
                />
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.variant.title}</p>
                <p>${item.variant.price}</p>
                <p>Orders: {item.quantity}</p>
                <Button
                  color="white"
                  bg="pink"
                  p={2}
                  border="none"
                  borderRadius={1}
                  onClick={() => removeProductFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div>
            {checkout.discountApplications.length > 0 ? (
              <div style={{ display: "flex" }}>
                <p style={{ alignSelf: "flex-end", marginRight: 10 }}>
                  Coupon:
                </p>
                <span className="tag is-danger is-medium">
                  {checkout.discountApplications[0].code} -
                  {checkout.discountApplications[0].value.percentage}%
                  <button
                    onClick={() => {
                      removeCoupon(checkout.discountApplications[0].code)
                    }}
                    className="delete"
                  ></button>
                </span>
              </div>
            ) : (
              <CouponForm
                onSubmit={e => {
                  e.preventDefault()
                  checkCoupon(coupon)
                }}
              >
                <div>
                  <Label mr={2} htmlFor="coupon">
                    Coupon:
                  </Label>
                  <input
                    className="input"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    type="text"
                  />
                </div>
                <Button
                  bg="white"
                  color="blue"
                  border="2px solid"
                  borderColor="blue"
                  borderRadius={1}
                  p={1}
                >
                  Add Coupon
                </Button>
              </CouponForm>
            )}
          </div>
          <hr />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: 10 }}>Tax & Shipping:</p>
            <h4>Calculated at checkout.</h4>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: 10 }}>Total:</p>
            <h4>${checkout.totalPrice}</h4>
          </div>
          <hr style={{ marginBottom: `2rem` }} />
          <Button
            cta
            as="a"
            href={checkout.webUrl}
            color="white"
            p={2}
            borderRadius={1}
          >
            Checkout Now
          </Button>
          <div
            style={{
              padding: `2rem`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`
            }}
          >
            <small>Checkout secured by </small>
            <span>
              <img
                style={{ width: `70px`, marginLeft: `6px` }}
                src={ShopifyLogo}
                alt="Shopify Logo"
              />
            </span>
          </div>
        </>
      ) : (
        <div className="notification level">
          <p className="level-item">Cart is empty</p>
        </div>
      )}
    </CartContainer>
  )
}

export default Cart
