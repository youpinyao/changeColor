const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./module.config.js');

const WebpackChunkHash = require('webpack-chunk-hash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const uglifyPlugins = require('./uglify.config.js');

const moduleName = 'changeColor';

let plugins = [

  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new WebpackChunkHash(),
  new ProgressBarPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

];

const sourceMapPlugin = function (name) {
  return new webpack.SourceMapDevToolPlugin({
    filename: `${name}.map`,
    exclude: ['vendor.js'],
  });
};

const entry = {
  [moduleName]: path.join(__dirname, '../../src/index.js'),
};

const output = function (p) {
  p = p || '';
  return {
    path: path.join(__dirname, `../../dist${p}`),
    filename: '[name].js',
  };
};

const outputMin = function (p) {
  p = p || '';
  return {
    path: path.join(__dirname, `../../dist${p}`),
    filename: '[name].min.js',
  };
};

module.exports = function () {
  return {
    all_uncompressed: {
      entry,
      output: output(),
      module: modules(true),
      plugins: plugins.concat([
        sourceMapPlugin('[name].js'),
      ]),
    },
    all_compressed: {
      entry,
      output: outputMin(),
      module: modules(),
      plugins: plugins.concat([
        uglifyPlugins,
        sourceMapPlugin('[name].min.js'),
      ]),
    },
  };
};
