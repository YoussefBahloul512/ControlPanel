const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const generateHtmlPlugins = (templateDir) =>
  glob.sync(`${templateDir}/**/*.html`).map(filePath => 
    new HtmlWebpackPlugin({
      filename: path.relative(templateDir, filePath),
      template: filePath,
      chunks: ['app', ...getChunksForFile(path.relative(templateDir, filePath))],
    })
  );

function getChunksForFile(fileName) {
  const chunks = {
    'index.html': ['assets/js/banner', 'assets/js/tabs', 'assets/js/chart'],
  };
  return chunks[fileName] || [];
}

const htmlPlugins = generateHtmlPlugins('./src');

module.exports = {
  entry: {
    'app': './src/index.js',
    ...glob.sync('./src/assets/js/*.js').reduce((entries, filePath) => {
      const entry = filePath.replace('./src/', '');
      entries[entry] = filePath;
      return entries;
    }, {})
  },
  output: {
    path: path.join(__dirname, "/app"),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/app"),
    },
    port: 8081,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: /fonts/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "assets/images",
            }
          }
        ]
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "assets/fonts",
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ...htmlPlugins,
    new MiniCssExtractPlugin({ filename: "assets/css/styles.css" }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
}
