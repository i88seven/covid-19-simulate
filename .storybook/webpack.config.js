const path = require('path');
const rootPath = path.resolve(__dirname, '../client');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ config }) => {
  config.resolve.alias['@'] = rootPath;
  config.resolve.alias['~'] = rootPath;

  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: './client/assets/sass/_variables.scss',
        }
      },
    ]
  });

  config.resolve.extensions = [".js", ".json", ".ts", ".css", ".scss", ".sass"]
  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      }
    ],
  });

  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  return config;
};