var isProduction = process.argv.indexOf('-p') !== -1;
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

// component configurations
var componentConfig = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: {
    module: "./src/index.ts",
    //vendor: ["angular", "angular-animate", "angular-ui-router", "angular-ui-router-redirect"]
  },
  output: {
    path: __dirname + "/dist",
    filename: "./angular-header.js"
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'baggage?[file].html&[file].css',
      exclude: /index\.html/
    }],
    loaders: [{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader!tslint'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + __dirname + '/src/!html',
        exclude: /index\.html/
      },
      {
        test: /\.scss$|\.css$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin("vendor", "angular-header.vendor.js"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin('./angular-header.css', {
      allChunks: true
    })
  ]
};

// examples configurations
var exampleConfig = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: {
    app: "./examples/src/index.ts",
    vendor: "./examples/src/vendor.ts",
  },
  output: {
    path: __dirname + "/examples/dist",
    filename: "./app.js"
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'baggage?[file].html&[file].css',
      exclude: /index\.html/
    }],
    loaders: [{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader!tslint'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + __dirname + '!html',
        exclude: /index\.html/
      },
      {
        test: /\.scss$|\.css$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new HtmlWebpackPlugin({
      template: './examples/src/index.html'
    }),
    new ExtractTextPlugin('./style.css', {
      allChunks: true
    })
  ]
};

// production configurations
if (isProduction || process.env.NODE_ENV === 'production') {
  componentConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    })
  );
  componentConfig.devtool = null;

  exampleConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    })
  );
  exampleConfig.devtool = null;
}

// build
module.exports = [componentConfig, exampleConfig];