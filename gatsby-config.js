const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'Sailing in Paradise',
    siteUrl: 'https://sailinginparadise.com.au'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: null
      }
      // options: {
      //   trackingId: 'UA-77246883-1',
      //   head: true,
      //   anonymize: true
      // }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        /*id: 'GTM-add_your_tag_here',*/
        id: 'GTM-K9HLJT2',
        includeInDevelopment: false
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '223323021332533'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-responsive-iframe`
        ]
      }
    },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://sailinginparadise.com.au',
        sitemap: 'https://sailinginparadise.com.au/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/cms/admin.css`,
        enableIdentityWidget: true
      }
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
