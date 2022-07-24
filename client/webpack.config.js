module.exports = {
  entry: './index.ts',

  target: "node",

  mode: "production",

  output: {
    filename: './bundle.js',
  },

  resolve: {
    extensions: ['', '.webpack.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
}
