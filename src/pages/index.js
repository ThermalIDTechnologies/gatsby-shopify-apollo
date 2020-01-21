import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/Footer"
import SEO from "../components/seo"
import {
  HomeContainer,
  Hero,
  ImgContainer,
  LeftContainer,
} from "./../components/styles/StyledHome"
import { Button } from "./../components/styles/StyledButton"

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
      <div className="site">
        <Header siteTitle={data.site.siteMetadata.title} />
        <HomeContainer className="site-content">
          <SEO title="Home" />
          <Hero>
            <LeftContainer>
              <h1>
                Many Stickers...
                <br />
                It's more than a few!
              </h1>
              <br />
              <div>
                <p>
                  Bring your sticker ideas to life and show off your
                  personality.
                  <br />
                  Get instant pricing online or give us a call for a custom
                  quote.
                  <br />
                  <span>Tell Your Sticker Story, Create Yours Today!</span>
                </p>
              </div>
              <br />
              <Button
                cta
                px={4}
                py={3}
                border="none"
                borderRadius={1}
                color="white"
              >
                <h2>Get Sticky!</h2>
              </Button>
            </LeftContainer>
            <ImgContainer>
              <img src="https://res.cloudinary.com/crjars/image/upload/c_scale,f_auto,q_auto:best,w_400/v1575587390/ms-logo.svg" />
            </ImgContainer>
          </Hero>
        </HomeContainer>
        <Footer />
      </div>
    </>
  )
}

export default IndexPage
