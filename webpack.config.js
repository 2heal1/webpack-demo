const path = require("path");
const { ModuleFederationPlugin,AsyncBoundaryPlugin } = require("@module-federation/enhanced");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const mfOptions = {
  name: "xxx",
  filename: "remoteEntry.js",
  exposes: {
    ".": "./src/index.js",
  },
  remotes:{
    app1:'app1@http://localhost:3000/remoteEntry.js'
  },
  shared: {
    react: {
      eager: true,
      singleton: true,
    },
    "react-dom": {
      eager: true,
      singleton: true,
      requiredVersion: "~1",
    },
  },
};
module.exports = {
  entry: {
    main: ["./src/index"],
  },
  devServer: {
    liveReload: false,
    hot: false,
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    allowedHosts: "all",
  },
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css", ".mjs"],
    alias: {
      "shared-config": path.resolve(__dirname, "./src/shared-config"),
    },
  },
  output: {
    clean: true,
    chunkFilename: "[name].[contenthash].js",
    globalObject: "globalThis",
    chunkLoadingGlobal: "app2",
    publicPath: "auto",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(mfOptions),
    new AsyncBoundaryPlugin(mfOptions),
    new HTMLWebpackPlugin(),
  ],
};
