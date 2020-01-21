import React from "react"
import { StoreProvider } from "./src/context/StoreContext"
import GlobalStyle from "./src/components/styles/GlobalStyle"
import { ThemeProvider } from "styled-components"
import theme from "./src/components/theme"
import "normalize.css"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>
    <ThemeProvider theme={theme}>
      {element}
      <GlobalStyle />
    </ThemeProvider>
  </StoreProvider>
)

const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")

registerLinkResolver(linkResolver)
