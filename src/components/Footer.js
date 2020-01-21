import React from "react"
import { FooterContainer } from "./styles/StyledFooter"
import ShopifyAcceptedPayments from "./ShopifyAcceptedPayments"

const Footer = () => {
  return (
    <FooterContainer>
      <ShopifyAcceptedPayments />
      <small>© {new Date().getFullYear()} Many Stickers</small>
    </FooterContainer>
  )
}

export default Footer
