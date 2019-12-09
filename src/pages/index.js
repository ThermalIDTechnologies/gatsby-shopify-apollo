import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query WebsiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="hero">
      <Header siteTitle={data.site.siteMetadata.title} />
      <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        <br />
        <Link to="/product/die-cut-sticker">Die Cut Sticker</Link>
        <br />
        <Link to="/product/trump-sticker">Trump Sticker</Link>
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default IndexPage
