import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useTransition } from "react-spring"
import { StoreContext } from "../context/StoreContext"
import Cart from "./Cart/Cart"
import MobileNav from "./MobileNav"

import {
  NavHeader,
  Nav,
  LogoLink,
  Ul,
  MobileNavButton,
  CartButton,
} from "./styles/StyledHeader"

const Header = ({ siteTitle }) => {
  const {
    isCartOpen,
    toggleCartOpen,
    isNavOpen,
    toggleNavOpen,
    checkout,
  } = useContext(StoreContext)
  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  })
  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <NavHeader>
      <Nav>
        <LogoLink to="/">
          <img
            src="https://res.cloudinary.com/crjars/image/upload/c_scale,q_auto:best,w_250/v1577387079/many-stickers/ms-logo-db.svg"
            alt={siteTitle}
          />
        </LogoLink>
        <Ul className="hide-ul">
          <li>
            <Link to="/custom-sticker/die-cut-sticker">Die Cut Stickers</Link>
          </li>
          <li>
            <Link to="/sticker-template/anti-trump">Anti-Trump Sticker Template</Link>
          </li>
          <li>
            <Link to="/page-2">Sticker</Link>
          </li>
        </Ul>
        <Ul>
          {/* <li>
            <Link>Profile</Link>
          </li> */}
          <li>
            <MobileNavButton onClick={toggleNavOpen}>
              {isNavOpen === false ? "Menu" : "Close Menu"}
            </MobileNavButton>
          </li>
          <li pl={4} pr={0}>
            <CartButton onClick={toggleCartOpen}>
              {qty > 0 ? <div>{qty}</div> : <div>0</div>}
            </CartButton>
          </li>
        </Ul>
      </Nav>
      <MobileNav isOpen={isNavOpen} />
      {transitions.map(
        ({ item, key, props }) => item && <Cart key={key} style={props} />
      )}
    </NavHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
