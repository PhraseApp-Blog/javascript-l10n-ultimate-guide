const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const port = 3000;
const openBrowser = false;

module.exports = {
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: port,
    open: openBrowser,
    historyApiFallback: {
      index: "index.html",
    },
    static: "public",
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      "original-fs": require.resolve("original-fs"),
      // buffer: require.resolve("buffer/"),
      // assert: require.resolve("assert/"),
      // crypto: require.resolve("crypto-browserify"),
      fs: require.resolve("browserify-fs"),
      net: require.resolve("net"),
      tls: require.resolve("tls-browserify"),
      // path: require.resolve("path-browserify"),
      // stream: require.resolve("stream-browserify"),
      // url: require.resolve("url/"),
      // util: require.resolve("util/"),
      // zlib: require.resolve("browserify-zlib"),
    },
  },
  module: {
    rules: [
      { test: /\.md$/, use: "ignore-loader" },
      { test: /\/LICENSE$/, use: "ignore-loader" },
    ],
  },
};
