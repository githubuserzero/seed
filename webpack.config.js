const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');

const {entry, dll, directory, externals} = require('./config');
const src = path.join(__dirname, 'src');

const extractCSS = new ExtractTextPlugin({filename: '[name].css', allChunks: true});

const baseConfig = () => ({
  target: 'web',
  
  output: {
    publicPath: '',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js',
  },
  
  plugins: [
    new CheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: fs.readdirSync('src/shared')
             .map(dir => 'src/shared/' + dir)
             .filter(dir => fs.statSync(dir).isDirectory())
             .reduce((alias, dir) => {
               alias[path.basename(dir)] = path.resolve(__dirname, dir);
               return alias;
             }, {}),
  },
  
  externals,
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: src,
        use: [
          {loader: 'awesome-typescript-loader'},
        ],
      },
      {
        test: /\.css$/,
        include: src,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=1',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: src,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap=true&url=false&modules=true&localIdentName="[name]__[local]___[hash:base64:5]"&importLoaders=2',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {loader: 'source-map-loader'},
        ],
      },
      {
        test: /\.html$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
        ],
      },
      {
        test: /\.txt$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
        ],
      },
      {
        test: /\.md$/,
        include: src,
        use: [
          {loader: 'raw-loader'},
          {loader: 'markdown-loader'},
        ],
      },
    ],
  },
});

const devConfig = () => merge(baseConfig(), {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(entry),
    }),
    extractCSS,
    ...Object.keys(dll).map(name => {
      return new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./${directory.dll}/${name}-manifest.json`),
      });
    }),
  ],
});

const prodConfig = () => merge(baseConfig(), {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      chunks: Object.keys(entry),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
  ],
});

const buildDLL = () => merge(baseConfig(), {
  devtool: 'source-map',
  
  output: {
    path: path.join(__dirname, directory.dll),
    library: '[name]_lib',
  },
  
  entry: dll,
  
  plugins: [
    new webpack.DllPlugin({
      path: `./${directory.dll}/[name]-manifest.json`,
      name: '[name]_lib',
    }),
  ],
});

const buildProduction = () => merge(prodConfig(), {
  output: {
    path: path.join(__dirname, directory.production),
  },
  
  entry,
  
  plugins: [
    new CopyWebpackPlugin([
      ...directory.static.map(dir => ({from: dir})),
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
  ],
});

const buildDev = () => merge(devConfig(), {
  devtool: 'source-map',
  cache: true,
  
  output: {
    path: path.join(__dirname, directory.debug),
  },
  
  entry,
});

const serveConfig = (port) => {
  return merge(devConfig(), {
    // devtool: 'cheap-module-source-map', // slow + update source map with hmr
    devtool: 'cheap-module-eval-source-map', // fast + no update source map with hmr
    cache: true,
    
    output: {
      path: path.join(__dirname),
    },
    
    entry: Object.keys(entry).reduce((obj, name) => {
      obj[name] = [
        `webpack-hot-middleware/client?http://localhost:${port}`,
        `webpack/hot/only-dev-server`,
      ].concat(Array.isArray(entry[name]) ? entry[name] : [entry[name]]);
      return obj;
    }, {}),
    
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  });
};

module.exports = ({action, port}) => new Promise((resolve, reject) => {
  switch (action) {
    case 'build.production':
      rimraf(directory.production, err => err ? reject(err) : resolve());
      break;
    case 'build.dev':
      rimraf(directory.debug, err => err ? reject(err) : resolve());
      break;
    case 'build.dll':
      rimraf(directory.dll, err => err ? reject(err) : resolve());
      break;
    case 'serve':
      resolve();
  }
}).then(() => {
  switch (action) {
    case 'build.production':
      return buildProduction();
    case 'build.dev':
      return buildDev();
    case 'build.dll':
      return buildDLL();
    case 'serve':
      return serveConfig(port);
  }
});
