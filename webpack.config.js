const path = require('path');
const nopdeExternals = require('webpack-node-externals')
const mode = /production/.test(String(process.env.NODE_ENV)) ? 'production' : 'development'
const tsconfigPaths = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode,
  entry: {
    index: {
      import: './server/index.ts',
    },
  },
  target: 'node',
  externals: [
    // function ({ request }, callback) {
    //   if (request.includes('../database/client')) {
    //     return callback(null, 'commonjs ' + request);
    //   }
    //   callback();
    // },
    function ({ request }, callback) {
      if (request.includes('../config.json')) {
        return callback(null, 'commonjs ' + './config.json');
      }
      callback();
    },
    function ({ request }, callback) {
      if (request.includes('./config.json')) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    nopdeExternals()
  ],
  externalsPresets: {
    node: true
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     path.join(__dirname, './server/config.json')
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: { loader: 'ts-loader', options: { configFile: 'server-prod.tsconfig.json' } },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    plugins: [
      new tsconfigPaths({ baseUrl: './' })
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
};
