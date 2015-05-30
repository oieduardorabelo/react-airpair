module.exports = {
  entry: {
    main: './main.js'
  },
  output: {
    filename: 'bundle.js',
    path: './dist/js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: './node_modules'
      }
    ]
  }
}
