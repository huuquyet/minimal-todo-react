module.exports = {
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
};
