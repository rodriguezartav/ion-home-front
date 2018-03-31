const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './ui'),
  entry: {
    metaDataTable: ['./apps/metaDataTable/index.jsx'],
    reports: ['./apps/reports/index.jsx']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/', // New
  },


  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.css$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81", "draft-js", "react-draft-wysiwyg"]),
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      }, {
        test: /\.js$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81", "draft-js", "react-draft-wysiwyg"]),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          },
        }],
      }, {
        test: /\.jsx$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81", "draft-js", "react-draft-wysiwyg"]),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          },
        }],
      },

    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: process.env.NODE_ENV == "staging" ? JSON.stringify("https://staging-srv.rodcocr.com") : JSON.stringify("https://srv.rodcocr.com"),
        DOMAIN: JSON.stringify("rodcocr.com")
      }
    }),
    new CleanWebpackPlugin(["dist/*.js", "dist/*.css", "dist/*.html", "dist/*.map", "dist/*.gz"], {
      verbose: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui', 'report.html'),
      filename: 'report.html',
      chunks: ['reports'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui', 'template.html'),
      filename: 'index.html',
      chunks: ['metaDataTable', 'style'],
      inject: 'body'
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CopyWebpackPlugin([{
      from: '../ion/assets',
      to: "assets"
    }]),
    new CopyWebpackPlugin([{
      from: '../vibra/assets',
      to: "assets"
    }]),
    new CopyWebpackPlugin([{
      from: 'public',
      to: "public"
    }])
  ],
};


function excludeNodeModulesExcept(modules) {
  var pathSep = path.sep;
  if (pathSep == '\\') // must be quoted for use in a regexp:
    pathSep = '\\\\';
  var moduleRegExps = modules.map(function(modName) {
    return new RegExp("node_modules" + pathSep + modName)
  })

  return function(modulePath) {
    if (/node_modules/.test(modulePath)) {
      for (var i = 0; i < moduleRegExps.length; i++)
        if (moduleRegExps[i].test(modulePath)) return false;
      return true;
    }
    return false;
  };


}
