import styled from "styled-components"
import { Link } from "gatsby"

import { colors } from "../styles/GlobalStyle"

export const NavHeader = styled.header`
  background: none;
  margin-bottom: 0;
`

export const Nav = styled.nav`
  padding: 1.1rem 2rem;
  display: flex;
  align-items: center;
`

export const LogoLink = styled(Link)`
  margin: 0;
  flex: 1;
  justify-content: flex-start;
  text-decoration: none;

  img {
    max-width: 250px;
  }
`

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  font-family: Oswald, sans-serif;

  &:first-of-type {
    display: none;
  }

  &:last-of-type {
    flex: 1;
    justify-content: flex-end;

    a {
      color: ${colors.darkBlue};
    }

    li {
      &:first-of-type {
        z-index: 1000;
      }
    }
  }

  li {
    a {
      text-decoration: none;
      text-transform: uppercase;
      color: ${colors.purple};
      padding: 1rem 2rem;
    }
  }

  @media screen and (min-width: 770px) {
    &:first-of-type {
      display: flex;
    }
  }
`

export const MobileNavButton = styled.button`
  border: none;
  background: none;
  color: ${colors.purple};
  z-index: 1000;
  text-transform: uppercase;

  @media screen and (min-width: 770px) {
    display: none;
  }
`

export const CartButton = styled.button`
  background: ${colors.darkBlue};
  border: none;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  div {
    color: white;
  }
`
