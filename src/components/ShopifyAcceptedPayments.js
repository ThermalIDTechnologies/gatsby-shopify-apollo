import React from "react"
import Visa from "../images/visa.svg"
import MasterCard from "../images/master-card.svg"
import Discover from "../images/discover.svg"
import AmericanExpress from "../images/american-express.svg"
import DinersClub from "../images/diners-club.svg"
import Jcb from "../images/jcb.svg"
import { AcceptedPayments } from "./styles/StyledFooter"

const ShopifyAcceptedPayments = () => {
  return (
    <AcceptedPayments>
      <img src={Visa} />
      <img src={MasterCard} />
      <img src={Discover} />
      <img src={AmericanExpress} />
      <img src={DinersClub} />
      <img src={Jcb} />
    </AcceptedPayments>
  )
}

export default ShopifyAcceptedPayments
