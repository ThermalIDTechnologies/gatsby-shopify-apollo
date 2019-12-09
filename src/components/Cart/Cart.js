import React, { useContext, useState } from "react"
import { animated } from "react-spring"
import { StoreContext } from "../../context/StoreContext"

const Cart = ({ style }) => {
  const {
    isCartOpen,
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)
  console.log("TCL: Cart -> checkout", checkout)

  const [coupon, setCoupon] = useState("")

  return (
    <animated.div
      style={{
        zIndex: 1000,
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100%",
        background: "white",
        padding: "40px 2%",
        boxShadow: "var(--elevation-4)",
        overflowY: "auto",
        ...style,
      }}
    >
      <button
        style={{
          background: "#ff3860",
          // position: "absolute",
          // top: 10,
          // right: 10,
          width: "25px",
          height: "25px",
          borderRadius: "50%"
        }}
        onClick={toggleCartOpen}
      >
        X
      </button>
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
                  height: 100,
                  overflow: "hidden",
                  marginRight: 10,
                }}
              >
                <img src={item.variant.image.src} alt={item.title} />
              </div>
              <div>
                <h4 className="title is-4">{item.title}</h4>
                <p className="subtitle is-5">${item.variant.price}</p>
                <p className="subtitle is-5">Qty: {item.quantity}</p>
                <button
                  className="is-small button is-danger is-outlined"
                  onClick={() => removeProductFromCart(item.id)}
                >
                  Remove
                </button>
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
              <form
                onSubmit={e => {
                  e.preventDefault()
                  checkCoupon(coupon)
                }}
              >
                <div className="field">
                  <label htmlFor="coupon" className="label">
                    Coupon
                  </label>
                  <input
                    className="input"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    type="text"
                  />
                </div>
                <button className="button">Add Coupon</button>
              </form>
            )}
          </div>
          <hr />
          <div style={{ display: "flex" }}>
            <p style={{ alignSelf: "flex-end", marginRight: 10 }}>Tax:</p>
            <h6 className="title">${checkout.totalTax}</h6>
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ alignSelf: "flex-end", marginRight: 10 }}>Sub Total:</p>
            <h6 className="title">${checkout.subtotalPrice}</h6>
          </div>
          <hr />
          <div style={{ display: "flex" }}>
            <p style={{ alignSelf: "flex-end", marginRight: 10 }}>Total:</p>
            <h5 className="title">${checkout.totalPrice}</h5>
          </div>
          <div>
            <a
              style={{ marginTop: "2rem" }}
              href={checkout.webUrl}
              className="button is-fullwidth is-success"
            >
              Checkout Now
            </a>
          </div>
        </>
      ) : (
        <div className="notification level">
          <p className="level-item">Cart is empty</p>
        </div>
      )}
    </animated.div>
  )
}

export default Cart
