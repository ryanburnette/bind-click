module.exports = {
  entry: './bind-click.js',
  output: {
    filename: 'bind-click.dist.js',
    library: 'bindClick',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  }
}
