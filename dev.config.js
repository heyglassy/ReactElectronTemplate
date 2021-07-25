const path = require("path");

module.exports = {
  mode: "development",
  target: "electron-renderer",
  entry: "./src/app.js",
  watch: true,
  cache: false,
  watchOptions: {
    followSymlinks: true,
    ignored: /node_modules/,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, "main.js"),
          /Ipc/,
          path.join(__dirname, "preload.js"),
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
