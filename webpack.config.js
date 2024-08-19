// // craco.config.js
// import crypto from 'crypto';
// import path from 'path';
// console.log(crypto, path);

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "util": require.resolve("util/")
      };
      return webpackConfig;
    }
  }
};
