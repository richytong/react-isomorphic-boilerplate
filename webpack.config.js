const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // define globals here
    },
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CompressionPlugin()
  );
} else {
  plugins.push(
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'webpack-report.html',
      openAnalyzer: false,
    })
  );
}

module.exports = {
  entry: {
    app: ['./src/client.jsx'],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins,
}
