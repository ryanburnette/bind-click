const path = require('path')

module.exports = {
  entry: './lib/bind-click.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bind-click.dist.js',
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
  }
}
