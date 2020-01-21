import styled from "styled-components"
import { colors } from "../styles/GlobalStyle"

export const HomeContainer = styled.main`
  padding: 0 2rem;
`

export const Hero = styled.div`
  padding: 1rem 0;

  /* Grid styles */
  display: grid;
  align-items: center;
  /* grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); */
  grid-template-areas:
    "heading"
    "stickers";

  @media screen and (min-width: 768px) {
    padding: 4rem 0;
    grid-template-areas: "heading stickers";
  }
`

export const LeftContainer = styled.div`
  grid-area: heading;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 40px;
    font-family: Oswald, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    color: ${colors.darkBlue};
    letter-spacing: -2px;
    line-height: 1.1;
    margin-top: 0;
    margin-bottom: 0;

    @media screen and (min-width: 768px) {
      font-size: 64px;
      letter-spacing: -3px;
      margin-top: 0.67em;
    }

    @media screen and (min-width: 1219px) {
      font-size: 96px;
      letter-spacing: -4px;
    }
  }

  span {
    color: ${colors.blue};
  }

  @media screen and (min-width: 768px) {
    button {
      max-width: 250px;
    }
  }
`

export const ImgContainer = styled.div`
  grid-area: stickers;
  justify-self: center;
  max-width: 400px;
  margin-top: 2rem;

  img {
    max-width: 100%;
  }

  @media screen and (min-width: 768px) {
    justify-self: end;
  }
`
