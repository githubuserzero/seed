const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const include = file => {
  return file.indexOf(path.resolve(__dirname, `src/shared/${name}`)) === 0;
};

const external = (module) => ({
  commonjs2: module,
  commonjs: module,
  amd: module,
});

const externals = {
  'react': external('react'),
  'react-dom': external('react-dom'),
};

const name = 'open-react-modal';

module.exports = (env) => new Promise(resolve => {
  const extractCSS = new ExtractTextPlugin({filename: `libs/${name}/index.css`, allChunks: true});
  
  const config = {
    devtool: 'source-map',
    
    entry: () => `./src/shared/${name}/index.ts`,
    
    externals,
    
    output: {
      filename: `libs/${name}/index.js`,
      libraryTarget: 'commonjs',
    },
    
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include,
          use: [
            {loader: 'awesome-typescript-loader'},
          ],
        },
        {
          test: /\.css$/,
          include,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true&url=false&importLoaders=1',
              'postcss-loader',
            ],
          }),
        },
        {
          test: /\.scss$/,
          include,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true&url=false&importLoaders=2',
              'postcss-loader',
              'sass-loader',
            ],
          }),
        },
      ],
    },
    
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      extractCSS,
      //new webpack.LoaderOptionsPlugin({
      //  minimize: true,
      //  debug: false,
      //}),
      //new webpack.optimize.UglifyJsPlugin({
      //  output: {
      //    comments: false,
      //  },
      //  compress: {
      //    warnings: false,
      //    screw_ie8: true,
      //  },
      //}),
    ],
  };
  
  resolve([config]);
});