import path from 'path';
import nodeExternals from 'webpack-node-externals';

const config = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'index.js')],
  mode: 'production',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '//',
    filename: 'index.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};

export default config;
