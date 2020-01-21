import styled from "styled-components"
import { space } from "styled-system"

export const CartContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: white;
  padding: 40px 2%;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.07),
    0 6.7px 5.3px rgba(0, 0, 0, 0.05),
    0 12.5px 10px rgba(0, 0, 0, 0.042),
    0 22.3px 17.9px rgba(0, 0, 0, 0.035),
    0 41.8px 33.4px rgba(0, 0, 0, 0.028),
    0 100px 80px rgba(0, 0, 0, 0.02)
  ;
  overflow-y: auto;

  @media screen and (min-width: 770px) {
    width: 500px;
  }
`

export const CloseBtn = styled.button`
  background: #FF2D6E;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  color: white;
`

export const CouponForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Label = styled.label`
  ${space}
`