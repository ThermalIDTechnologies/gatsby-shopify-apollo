import styled from "styled-components"
import { colors } from "../styles/GlobalStyle"

export const MobileNavContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
`

export const MobileNavLeft = styled.div`
  width: 30%;
  height: 100%;
  background: ${colors.purple};
`

export const MobileNavRight = styled.div`
  width: 70%;
  height: 100%;
  background: ${colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Oswald, sans-serif;
`

export const MobileNavUl = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 1.5rem

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: white;
      padding: 1rem 2rem;
      font-size: 1.5rem;
    }
  }
`
