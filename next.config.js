// const path = require('path')
//
// module.exports = {
//   trailingSlash: true,
//   reactStrictMode: false,
//   experimental: {
//     esmExternals: false,
//     jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
//   },
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//     }
//
//     return config
//   }
// }

const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
// const withTM = require('next-transpile-modules')([
//   '@fullcalendar/common',
//   '@fullcalendar/react',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/list',
//   '@fullcalendar/timegrid'
// ])

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
      }
    ];
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config
  }
}
