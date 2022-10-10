const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx', // path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.jsx',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
  },
};
