const path = require('path');

module.exports = {

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@wagmi/core': require.resolve('@wagmi/core'),
      '@web3modal/core': require.resolve('@web3modal/core'),
    },
  },  

};