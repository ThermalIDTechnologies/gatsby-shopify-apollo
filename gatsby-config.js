// Load the environment variables.
require("dotenv").config({
  path: `.env`,
})

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
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `Manystickers`,
        pages: [
          {
            type: `Customer_uploaded_sticker`, // TypeName from prismic
            match: `/custom-sticker/:uid`, // Pages will be generated under this pattern
            path: `/custom-stickers`, // Placeholder page for unpublished documents
            component: require.resolve(
              "./src/templates/CustomerUploadedSticker.js"
            ),
          },
          {
            type: `Sticker_with_1_transformation`, // TypeName from prismic
            match: `/sticker-template-1/:uid`, // Pages will be generated under this pattern
            path: `/sticker-templates`, // Placeholder page for unpublished documents
            component: require.resolve("./src/templates/StickerOneTemplate.js"),
          },
          // {
          //   type: `Sticker_with_2_transformations`, // TypeName from prismic
          //   match: `/custom-sticker/:uid`, // Pages will be generated under this pattern
          //   path: `/custom-stickers`, // Placeholder page for unpublished documents
          //   component: require.resolve(
          //     "./src/templates/StickerTwoTemplate.js"
          //   ),
          // },
          // {
          //   type: `Sticker_with_3_transformations`, // TypeName from prismic
          //   match: `/sticker-template-3/:uid`, // Pages will be generated under this pattern
          //   path: `/sticker-templates`, // Placeholder page for unpublished documents
          //   component: require.resolve(
          //     "./src/templates/StickerThreeTemplate.js"
          //   ),
          // },
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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `PT Mono`,
          `Oswald:400,600`, // you can also specify font weights and styles
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    {
      resolve: "gatsby-transformer-cloudinary",
      options: {
        cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        apiKey: `${process.env.CLOUDINARY_API_KEY}`,
        apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,

        // This folder will be created if it doesn’t exist.
        uploadFolder: "gatsby-cloudinary",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
