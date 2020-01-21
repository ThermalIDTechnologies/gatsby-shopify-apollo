import styled, { css } from "styled-components"
import { color, space, border, background } from "styled-system"
import { colors } from "../styles/GlobalStyle"

export const Button = styled.button`
  ${color}
  ${space}
  ${border}
  ${background}
  text-decoration: none;
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  ${props => props.cta && css`
    background: ${colors.pinkToBlue};
  `}

  h2 {
    margin: 0;
    font-weight: 400;
  }
`
