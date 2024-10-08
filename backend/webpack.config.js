const path = require("path");

module.exports = {
  mode: "development", // or 'production'
  entry: "./server.js", // update this path if your entry file is different
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
