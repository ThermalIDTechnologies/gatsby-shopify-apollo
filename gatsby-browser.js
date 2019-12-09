import React from "react"
import { StoreProvider } from "./src/context/StoreContext"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)

const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")

registerLinkResolver(linkResolver)
