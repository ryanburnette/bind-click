/* jshint node: true, asi: true, esversion: 6 */
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './lib/bind-click.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bind-click.js',
    library: 'bindClick',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\/lib\/bind-click.js/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
  ]
}
