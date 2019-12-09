import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useTransition } from "react-spring"
import { StoreContext } from "../context/StoreContext"
import Cart from "../components/Cart/Cart"

// import Logo from "../assets/manystickers-logo.svg"

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext)
  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  })
  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <header
      style={{
        background: `none`,
        marginBottom: `0`,
      }}
    >
      <nav
        style={{
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <ul
          style={{
            listStyleType: `none`,
            padding: 0,
            display: `flex`,
            flex: 1,
            alignItems: `center`,
            justifyContent: `flex-start`,
          }}
        >
          <li
            style={{
              textTransform: `uppercase`,
              color: `#26264B`,
              padding: `2rem`,
            }}
          >
            Sticker
          </li>
          <li
            style={{
              textTransform: `uppercase`,
              color: `#26264B`,
              padding: `2rem`,
            }}
          >
            Sticker
          </li>
          <li
            style={{
              textTransform: `uppercase`,
              color: `#26264B`,
              padding: `2rem`,
            }}
          >
            Sticker
          </li>
        </ul>
        <h1 style={{ width: `250px`, margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `#26264B`,
              textDecoration: `none`,
            }}
          >
            <img
              src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:good,w_250/v1575587390/ms-logo.svg"
              style={{ maxWidth: `250px` }}
              alt={siteTitle}
            />
          </Link>
        </h1>
        <ul
          style={{
            listStyleType: `none`,
            padding: 0,
            display: `flex`,
            flex: 1,
            alignItems: `center`,
            justifyContent: `flex-end`,
          }}
        >
          <li
            style={{
              textTransform: `uppercase`,
              color: `#26264B`,
              padding: `2rem`,
            }}
          >
            Profile
          </li>
          <li
            style={{
              textTransform: `uppercase`,
              color: `#26264B`,
              padding: `2rem`,
            }}
          >
            <button
              style={{
                background: "var(--red)",
                border: "none",
                position: "relative",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              onClick={toggleCartOpen}
            >
              {qty > 0 && (
                <div
                  style={
                    {
                      color: "white",
                    }
                  }
                >
                  {qty}
                </div>
              )}
            </button>
          </li>
        </ul>
      </nav>
      {transitions.map(
        ({ item, key, props }) => item && <Cart key={key} style={props} />
      )}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
