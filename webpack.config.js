/* jshint node: true, asi: true, esversion: 6 */
const path = require('path')
const Uglify = require('uglifyjs-webpack-plugin')

const plugins = []

if ( process.env.MIN ) {
  plugins.push(new Uglify())
}

let dotmin = ''

if ( process.env.MIN ) {
  dotmin = '.min'
}

module.exports = {
  entry: './lib/bind-click.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bind-click'+dotmin+'.js',
    library: 'bindClick',
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
  plugins
}
