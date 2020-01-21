import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    line-height: 1.5;
    font-family: 'PT Mono', monospace;
    color: #1B1B35;
    min-height: 100%;
  }

  .site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  
  .site-content {
    flex-grow: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
  }
`

export default GlobalStyle

export const colors = {
  black: "#000e1a",
  white: "#fff",
  blue: "#3E38E0",
  darkBlue: "#1B1B35",
  pink: "#FF2D6E",
  purple: "#7975E5",
  pinkToBlue:
    "linear-gradient(0deg, rgba(62,56,224,1) 0%, rgba(255,45,110,1) 100%)",
}
