const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const RemoteTypesPlugin = require('webpack-remote-types-plugin').default

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'main',
      filename: 'remoteEntry.js',
      remotes: {
        mf_header: 'mf_header@http://localhost:3001/remoteEntry.js',
        mf_shared_ui: 'mf_shared_ui@http://localhost:3003/remoteEntry.js',
      },
    }),
    new RemoteTypesPlugin({
      remotes: {
        mf_shared_ui: 'mf_shared_ui@http://localhost:3003/',
      },
      outputDir: 'types',
      remoteFileName: '[name]-dts.tgz',
    }),
  ],
}
