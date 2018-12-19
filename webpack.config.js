const path = require('path')
const webpack = require('webpack')

module.exports = (_, argv) => {
  const mode = argv.mode || 'development'
  const env = require(
    mode === 'production' ? './.env/prod.json' : './.env/dev.json'
  )
  for (const [envVar, value] of Object.entries(env)) {
    env[envVar] = JSON.stringify(value)
  }
  const plugins = [new webpack.DefinePlugin({ 'process.env': env })]
  if (mode === 'production') {
    plugins.push(
      new (require('compression-webpack-plugin'))(),
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        analyzerMode: 'static',
        reportFilename: 'webpack-report.html',
        openAnalyzer: false,
      })
    )
  } else {
    plugins.push(
      new (require('friendly-errors-webpack-plugin'))(),
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        analyzerMode: 'static',
        reportFilename: 'webpack-report.html',
        openAnalyzer: false,
      })
    )
  }
  return {
    mode,
    entry: {
      app: [path.resolve('./src/client.jsx')],
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
    output: {
      path: path.resolve('./build'),
      filename: 'app.bundle.js',
    },
    plugins,
  }
}
