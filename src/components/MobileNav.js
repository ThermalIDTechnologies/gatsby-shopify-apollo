import React, { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { useSpring, a } from "react-spring"
import {
  MobileNavContainer,
  MobileNavLeft,
  MobileNavRight,
  MobileNavUl,
} from "./styles/StyledMobileNav"
import { Link } from "gatsby"

const MobileNav = ({ isOpen }) => {
  const { isNavOpen, toggleNavOpen } = useContext(StoreContext)

  const { x } = useSpring({
    x: isNavOpen ? 0 : 100,
  })
  return (
    <MobileNavContainer
      className="checkout"
      style={{
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <MobileNavLeft
        as={a.div}
        style={{
          transform: x.interpolate(x => `translate3d(-${x}%, 0, 0)`),
        }}
      ></MobileNavLeft>
      <MobileNavRight
        as={a.div}
        style={{
          transform: x.interpolate(x => `translate3d(${x}%, 0, 0)`),
        }}
      >
        <MobileNavUl>
          <li>
            <Link to="/custom-sticker/die-cut-sticker" onClick={toggleNavOpen}>Stickers</Link>
          </li>
          <li>
            <Link to="/sticker-template/anti-trump" onClick={toggleNavOpen}>Stickers</Link>
          </li>
          <li>
            <Link>Stickers</Link>
          </li>
        </MobileNavUl>
      </MobileNavRight>
    </MobileNavContainer>
  )
}

export default MobileNav
