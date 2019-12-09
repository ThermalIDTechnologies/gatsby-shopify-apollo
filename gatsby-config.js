module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `Manystickers`,
        pages: [
          {
            type: `Product`, // TypeName from prismic
            match: `/product/:uid`, // Pages will be generated under this pattern
            path: `/products`, // Placeholder page for unpublished documents
            component: require.resolve(
              "./src/templates/ProductDetailTemplate.js"
            ),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-apollo`,
      options: {
        uri: `https://test-sticker-store.myshopify.com/api/graphql`,
        headers: {
          "X-Shopify-Storefront-Access-Token": `000a9c2e4a234b4136ac100f584f8378`,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
